import { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthScreen } from "./components/AuthScreen";
import { Dashboard } from "./components/Dashboard";
import { DevTools } from "./components/DevTools";
import { useAuth } from "./hooks/useAuth"; // Manages authentication state and provides login/logout functionality
import { useSites } from "./hooks/useSites"; // Fetches and manages site data using the session token
import { theme } from "./components/theme";
import "./App.css";

/**
 * App.tsx serves as the main entry point and demonstrates:
 * 1. Authentication flow with Webflow's Designer and Data APIs
 * 2. Data fetching patterns using React Query
 * 3. State management for user sessions
 * 4. Development tools for testing
 *
 * The code is intentionally verbose to show common patterns
 * you might need when building your own Webflow App.
 */

// React Query setup - Used for managing API calls and caching
const queryClient = new QueryClient();

// This is the main App Component. It handles the initial setup and rendering of the Dashboard.
function App() {
  const [hasClickedFetch, setHasClickedFetch] = useState(false); // State for tracking if user has clicked the "List Authorized Sites" button
  const { user, sessionToken, checkAndGetToken, logout } = useAuth(); // Manages authentication state and provides login/logout (clear session) functionality
  const { sites, isLoading, isError, error, fetchSites } = useSites(
    sessionToken,
    hasClickedFetch
  ); // Fetches and manages site data using the session token

  // This ref prevents infinite loops by tracking if we've already checked for a valid token.
  const hasCheckedToken = useRef(false);

  // Authentication flow handling
  useEffect(() => {
    webflow.setExtensionSize("large");

    const handleAuthFlow = async () => {
      // Get existing session information from local storage
      const wasExplicitlyLoggedOut = localStorage.getItem(
        "explicitly_logged_out"
      );
      const storedUser = localStorage.getItem("wf_hybrid_user");

      // Attempt auto-login if user was not explicitly logged out
      if (storedUser && !wasExplicitlyLoggedOut) {
        await checkAndGetToken();
      }
    };

    // React's useEffect runs on every render, but we only want to check authentication once
    // when the app first loads. This ref prevents unnecessary repeated auth checks.
    if (!hasCheckedToken.current) {
      handleAuthFlow();
      hasCheckedToken.current = true;
    }

    // Handle auth popup completion
    const handleAuthComplete = async (event: MessageEvent) => {
      if (event.data === "authComplete") {
        localStorage.removeItem("explicitly_logged_out");
        hasCheckedToken.current = false; // Reset flag to allow new token check
        await checkAndGetToken();
      }
    };

    window.addEventListener("message", handleAuthComplete);
    return () => window.removeEventListener("message", handleAuthComplete);
  }, [checkAndGetToken]);

  const handleFetchSites = () => {
    setHasClickedFetch(true);
    fetchSites();
  };

  return (
    <QueryClientProvider client={queryClient}>
      {/* This provider is used to manage the React Query client, which is responsible for caching, background updates, and other features. */}
      <ThemeProvider theme={theme}>
        {!user.firstName ? (
          // If the user is not logged in, show the AuthScreen
          <AuthScreen onAuth={checkAndGetToken} />
        ) : (
          <>
            {/* If the user is logged in, show the Dashboard */}
            <Dashboard
              user={user}
              sites={sites || []}
              isLoading={isLoading}
              isError={isError}
              error={error?.message || ""}
              onFetchSites={handleFetchSites}
            />

            {/* If we're in development and the user is logged in, show the DevTools */}
            {process.env.NODE_ENV === "development" && (
              <DevTools
                logout={logout}
                setHasClickedFetch={setHasClickedFetch}
              />
            )}
          </>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
