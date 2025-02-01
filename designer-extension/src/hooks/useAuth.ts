import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { User, DecodedToken } from "../types/types";

const base_url = import.meta.env.VITE_NEXTJS_API_URL;

interface AuthState {
  user: User;
  sessionToken: string;
}

/**
 * Custom hook for managing authentication state and token exchange.
 *
 * Authentication Flow:
 * 1. User initiates auth -> exchangeAndVerifyIdToken()
 *    - Gets ID token from Webflow (Designer APIs)
 *    - Exchanges it for a session token via API
 *
 * 2. Token Exchange -> tokenMutation
 *    - Sends ID token to Data Client
 *    - Data Client validates and returns session token
 *    - On success, decodes and stores token + user data
 *
 * 3. Session Management -> useQuery for token validation
 *    - Automatically checks for existing valid session
 *    - Handles token expiration
 *    - Manages loading states
 *
 * @returns {Object} Authentication utilities and state
 * - user: Current user information
 * - sessionToken: Active session token
 * - isAuthLoading: Loading state
 * - exchangeAndVerifyIdToken: Exchange ID token for session token
 * - logout: Clear authentication state
 */
export function useAuth() {
  // Get access to React Query's cache management
  const queryClient = useQueryClient();

  // Query for managing auth state and token validation
  const { data: authState, isLoading: isAuthLoading } = useQuery<AuthState>({
    queryKey: ["auth"],
    queryFn: async () => {
      const storedUser = localStorage.getItem("wf_hybrid_user");
      const wasExplicitlyLoggedOut = localStorage.getItem(
        "explicitly_logged_out"
      );

      // Return initial state if no stored user or logged out
      if (!storedUser || wasExplicitlyLoggedOut) {
        return { user: { firstName: "", email: "" }, sessionToken: "" };
      }

      try {
        const userData = JSON.parse(storedUser);
        if (!userData.sessionToken) {
          return { user: { firstName: "", email: "" }, sessionToken: "" };
        }

        // Decode and validate token
        const decodedToken = jwtDecode(userData.sessionToken) as DecodedToken;
        if (decodedToken.exp * 1000 <= Date.now()) {
          // Token expired
          return { user: { firstName: "", email: "" }, sessionToken: "" };
        }

        // Return valid auth state
        console.log("decodedToken", decodedToken.user);
        return {
          user: {
            firstName: decodedToken.user.firstName,
            email: decodedToken.user.email,
          },
          sessionToken: userData.sessionToken,
        };
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        return { user: { firstName: "", email: "" }, sessionToken: "" };
      }
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  // Mutation for exchanging ID token for session token
  const tokenMutation = useMutation({
    mutationFn: async (idToken: string) => {
      // Get site info from Webflow
      const siteInfo = await webflow.getSiteInfo();

      // Exchange token with backend
      const response = await fetch(`${base_url}/api/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: idToken, siteId: siteInfo.siteId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to exchange token: ${JSON.stringify(errorData)}`
        );
      }

      const data = await response.json();
      if (!data.sessionToken) {
        throw new Error("No session token received");
      }

      return data;
    },
    onSuccess: (data) => {
      try {
        // Decode the new token
        const decodedToken = jwtDecode(data.sessionToken) as DecodedToken;
        const userData = {
          sessionToken: data.sessionToken,
          firstName: decodedToken.user.firstName,
          email: decodedToken.user.email,
          exp: decodedToken.exp,
        };

        // Update localStorage
        localStorage.setItem("wf_hybrid_user", JSON.stringify(userData));

        // Update auth state through query invalidation
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    },
  });

  // Function to initiate token exchange process
  const exchangeAndVerifyIdToken = useCallback(async () => {
    try {
      // Small delay to prevent rapid retries
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get new ID token from Webflow
      const idToken = await webflow.getIdToken();

      // Validate token format
      if (!idToken || typeof idToken !== "string" || !idToken.trim()) {
        throw new Error("Invalid or missing ID token");
      }

      // Exchange token using mutation
      await tokenMutation.mutateAsync(idToken);
    } catch (error) {
      console.error("Detailed error in token exchange:", error);
    }
  }, [tokenMutation]);

  // Function to handle user logout
  const logout = useCallback(() => {
    // Set logout flag and clear storage
    localStorage.setItem("explicitly_logged_out", "true");
    localStorage.removeItem("wf_hybrid_user");
    queryClient.setQueryData(["auth"], {
      user: { firstName: "", email: "" },
      sessionToken: "",
    });
    queryClient.clear();
  }, [queryClient]);

  return {
    user: authState?.user || { firstName: "", email: "" },
    sessionToken: authState?.sessionToken || "",
    isAuthLoading,
    exchangeAndVerifyIdToken,
    logout,
  };
}
