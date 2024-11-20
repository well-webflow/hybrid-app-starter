import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { User, TokenResponse, DecodedToken } from "../types/types.ts";

/**
 * Custom hook for managing authentication state and token exchange.
 *
 * Authentication Flow:
 * 1. User initiates auth -> exchangeAndVerifyIdToken()
 *    - Gets ID token from Webflow
 *    - Exchanges it for a session token via API
 *
 * 2. Token Exchange -> tokenMutation
 *    - Sends ID token to backend
 *    - Backend validates and returns session token
 *    - On success, decodes and stores token + user data
 *
 * 3. Session Management -> checkAndGetToken()
 *    - Checks for existing valid session
 *    - If expired/missing, triggers new token exchange
 *
 * @returns {Object} Authentication utilities and state
 * - user: Current user information
 * - sessionToken: Active session token
 * - checkAndGetToken: Verify and retrieve valid token
 * - exchangeAndVerifyIdToken: Exchange ID token for session token
 * - logout: Clear authentication state
 */
export function useAuth() {
  // State variables
  const [sessionToken, setSessionToken] = useState("");
  const [user, setUser] = useState<User>({ firstName: "", email: "" });
  const base_url = import.meta.env.VITE_NEXTJS_API_URL;

  // Token processing utilities
  const handleDecodedToken = (
    sessionToken: string,
    decodedToken: DecodedToken
  ) => {
    const userData = {
      sessionToken,
      firstName: decodedToken.user.firstName,
      email: decodedToken.user.email,
      exp: decodedToken.exp,
    };

    // Persist to local storage
    localStorage.setItem("wf_hybrid_user", JSON.stringify(userData));

    // Update application state
    setSessionToken(sessionToken);
    setUser({
      firstName: decodedToken.user.firstName,
      email: decodedToken.user.email,
    });
  };

  // Core token exchange logic
  const tokenMutation = useMutation({
    mutationFn: async (idToken: string) => {
      // Get site info using Designer API
      const siteInfo = await webflow.getSiteInfo();

      /*
       * Resolve ID Token using Webflow's Data API and backend server logic.
       *
       * On our server, this endpoint will:
       * 1. Retrieve an Authorization Token by matching Site ID with an existing
       *    (Site ID + Authorization Token) pair, which was created when the Data Client
       *    was authorized for the Site.
       * 2. Resolve the ID Token by sending a request to Webflow's Data API, using
       *    the retrieved Authorization Token
       * 3. Get the User ID from the resolved ID Token, and store it in the database
       *    as a (User ID + Access Token) pair.
       * 4. Mint a session token using the User details
       * 5. Return a session token to the client
       */
      const response = await fetch(`${base_url}/api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send ID Token and Site ID to Webflow's Data API
        body: JSON.stringify({
          idToken,
          siteId: siteInfo.siteId,
        }),
      });

      // Receive a Session Token from the server
      return response.json() as Promise<TokenResponse>;
    },
    onSuccess: (data) => {
      // Decode token and extract values
      const decodedToken = jwtDecode(data.sessionToken) as DecodedToken;

      // Process the decoded token and update state
      handleDecodedToken(data.sessionToken, decodedToken);

      console.log(`Session Token: ${data.sessionToken}`);
    },

    onError: (error) => {
      console.error("Error exchanging ID token:", error);
    },
  });

  // Public authentication methods
  const exchangeAndVerifyIdToken = async () => {
    try {
      // Exchange ID token for Session Token
      const idToken = await webflow.getIdToken();
      tokenMutation.mutate(idToken);
    } catch (error) {
      console.error("Error fetching ID Token:", error);
    }
  };

  // Session management
  const checkAndGetToken = async () => {
    // Check local storage for user
    const storedUser = localStorage.getItem("wf_hybrid_user");

    // If user exists, check if token is expired
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Check if token is expired (exp is in seconds, Date.now() is in milliseconds)
      if (userData.exp * 1000 > Date.now()) {
        setUser({
          firstName: userData.firstName,
          email: userData.email,
        });
        setSessionToken(userData.sessionToken);
        return;
      }
    }

    // If no stored user or token is expired, get a new one
    await exchangeAndVerifyIdToken();
  };

  // 6. Logout
  const logout = useCallback(async () => {
    // Add a flag to prevent auto re-auth
    localStorage.setItem("explicitly_logged_out", "true");

    // Clear auth-related storage
    localStorage.removeItem("wf_hybrid_user");

    // Reset user state
    setUser({ firstName: "", email: "" });
    setSessionToken("");
  }, []);

  // 5. Return public interface
  return {
    user,
    sessionToken,
    checkAndGetToken,
    exchangeAndVerifyIdToken,
    logout,
  };
}
