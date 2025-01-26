import { useState, useCallback, useRef, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { User, DecodedToken } from "../types/types.ts";

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
  // Use useRef to track initialization logging
  const hasLogged = useRef(false);
  if (!hasLogged.current) {
    console.log("useAuth hook initializing (first time only)");
    hasLogged.current = true;
  }

  const [sessionToken, setSessionToken] = useState(() => {
    const storedUser = localStorage.getItem("wf_hybrid_user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        return userData.sessionToken || "";
      } catch (error) {
        console.error("Error parsing stored session token:", error);
        return "";
      }
    }
    return "";
  });

  // State for the authentication loading state
  const [isAuthLoading, setIsAuthLoading] = useState(() => {
    // Get the stored user and the explicitly logged out flag
    const storedUser = localStorage.getItem("wf_hybrid_user");
    const wasExplicitlyLoggedOut = localStorage.getItem(
      "explicitly_logged_out"
    );

    // Return true if there is a stored user and the user was not explicitly logged out
    return !!(storedUser && !wasExplicitlyLoggedOut);
  });

  // State for the user
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem("wf_hybrid_user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.sessionToken) {
          // Decode the token to get user information
          const decodedToken = jwtDecode(userData.sessionToken) as DecodedToken;
          return {
            firstName: decodedToken.user.firstName || "",
            email: decodedToken.user.email || "",
          };
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
    return { firstName: "", email: "" };
  });

  const base_url = import.meta.env.VITE_NEXTJS_API_URL;

  // Memoize functions to prevent unnecessary recreations
  const handleDecodedToken = useCallback(
    (sessionToken: string, decodedToken: DecodedToken) => {
      const userData = {
        sessionToken,
        firstName: decodedToken.user.firstName,
        email: decodedToken.user.email,
        exp: decodedToken.exp,
      };

      localStorage.setItem("wf_hybrid_user", JSON.stringify(userData));
      setSessionToken(sessionToken);
      setUser({
        firstName: decodedToken.user.firstName,
        email: decodedToken.user.email,
      });
    },
    []
  );

  const tokenMutation = useMutation({
    mutationFn: async (idToken: string) => {
      console.log(
        "Starting token exchange with idToken:",
        idToken.substring(0, 20) + "..."
      ); // Log partial token for debugging
      const siteInfo = await webflow.getSiteInfo();
      console.log("Site info:", siteInfo); // Log site info

      const response = await fetch(`${base_url}/api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
          siteId: siteInfo.siteId,
        }),
      });

      if (!response.ok) {
        // Log more details about the failed response
        const errorData = await response.json();
        console.error("Token exchange failed:", {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });
        throw new Error(
          `Failed to exchange token: ${JSON.stringify(errorData)}`
        );
      }

      const data = await response.json();
      console.log("Token exchange successful:", !!data.sessionToken); // Log success
      if (!data.sessionToken) {
        throw new Error("No session token received");
      }

      return data;
    },
    onSuccess: useCallback(
      (data: { sessionToken: string }) => {
        try {
          const decodedToken = jwtDecode(data.sessionToken) as DecodedToken;
          handleDecodedToken(data.sessionToken, decodedToken);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
        setIsAuthLoading(false);
      },
      [handleDecodedToken]
    ),
    onError: useCallback((error: Error) => {
      console.error("Detailed token exchange error:", error);
      setIsAuthLoading(false);
    }, []),
  });

  const exchangeAndVerifyIdToken = useCallback(async () => {
    console.log("exchangeAndVerifyIdToken called");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const idToken = await webflow.getIdToken();

      if (!idToken || typeof idToken !== "string" || !idToken.trim()) {
        throw new Error("Invalid or missing ID token");
      }

      await tokenMutation.mutateAsync(idToken);
    } catch (error) {
      console.error("Detailed error in token exchange:", error);
      setIsAuthLoading(false);
    }
  }, [tokenMutation]);

  const checkAndGetToken = useCallback(async () => {
    console.log("checkAndGetToken called");
    setIsAuthLoading(true);
    try {
      const storedUser = localStorage.getItem("wf_hybrid_user");
      const wasExplicitlyLoggedOut = localStorage.getItem(
        "explicitly_logged_out"
      );

      if (storedUser && !wasExplicitlyLoggedOut) {
        const userData = JSON.parse(storedUser);
        if (userData.sessionToken) {
          try {
            const decodedToken = jwtDecode(
              userData.sessionToken
            ) as DecodedToken;
            if (decodedToken.exp * 1000 > Date.now()) {
              setUser({
                firstName: decodedToken.user.firstName,
                email: decodedToken.user.email,
              });
              setSessionToken(userData.sessionToken);
              setIsAuthLoading(false);
              return;
            }
          } catch (error) {
            console.error("Error decoding stored token:", error);
          }
        }
      }

      await exchangeAndVerifyIdToken();
    } catch (error) {
      console.error("Error checking token:", error);
      setSessionToken("");
      setIsAuthLoading(false);
    }
  }, [exchangeAndVerifyIdToken]);

  const logout = useCallback(() => {
    localStorage.setItem("explicitly_logged_out", "true");
    localStorage.removeItem("wf_hybrid_user");
    setUser({ firstName: "", email: "" });
    setSessionToken("");
  }, []);

  // Return memoized values
  return useMemo(
    () => ({
      user,
      sessionToken,
      isAuthLoading,
      checkAndGetToken,
      exchangeAndVerifyIdToken,
      logout,
    }),
    [
      user,
      sessionToken,
      isAuthLoading,
      checkAndGetToken,
      exchangeAndVerifyIdToken,
      logout,
    ]
  );
}
