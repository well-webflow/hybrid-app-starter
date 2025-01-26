import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navigation } from "./components/Navigation";
import { CustomCodeDashboard } from "./components/CustomCode/CustomCodeDashboard";
import { AuthScreen } from "./components/AuthScreen";
import { Dashboard } from "./components/Dashboard";
import { DevTools } from "./components/DevTools";
import { useAuth } from "./hooks/useAuth"; // Manages authentication state and provides login/logout functionality
import { useSites } from "./hooks/useSites"; // Fetches and manages site data using the session token
import { theme } from "./components/theme";
import "./App.css";
import { ElementsDashboard } from "./components/Elements/ElementsDashbaord";

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
function AppContent() {
  const [hasClickedFetch, setHasClickedFetch] = useState(false);
  const { user, sessionToken, checkAndGetToken, logout } = useAuth();
  const { sites, isLoading, isError, error, fetchSites } = useSites(
    sessionToken,
    hasClickedFetch
  );

  // Move ref outside useEffect to persist across renders
  const hasCheckedToken = useRef(false);

  useEffect(() => {
    // Set the extension size to large
    webflow.setExtensionSize("large");

    // Only run auth flow if not already checked
    if (!hasCheckedToken.current) {
      const storedUser = localStorage.getItem("wf_hybrid_user");
      const wasExplicitlyLoggedOut = localStorage.getItem(
        "explicitly_logged_out"
      );

      if (storedUser && !wasExplicitlyLoggedOut) {
        checkAndGetToken();
      }
      hasCheckedToken.current = true;
    }

    // Handle the authentication complete event
    const handleAuthComplete = async (event: MessageEvent) => {
      if (event.data === "authComplete") {
        localStorage.removeItem("explicitly_logged_out");
        // Don't reset hasCheckedToken here, as we don't need to recheck
        await checkAndGetToken();
      }
    };
    // Add the event listener for the authentication complete event
    window.addEventListener("message", handleAuthComplete);
    return () => window.removeEventListener("message", handleAuthComplete);
  }, [checkAndGetToken]);

  // Handle the fetch sites button click
  const handleFetchSites = () => {
    setHasClickedFetch(true);
    fetchSites();
  };

  // Render the app
  return (
    <BrowserRouter>
      <Box sx={{ pb: 8 }}>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              // If the user is authenticated, render the dashboard
              sessionToken ? (
                <Dashboard
                  user={user}
                  sites={sites}
                  isLoading={isLoading}
                  isError={isError}
                  error={error?.message || ""}
                  onFetchSites={handleFetchSites}
                />
              ) : (
                // If the user is not authenticated, render the auth screen
                <AuthScreen onAuth={() => {}} />
              )
            }
          />
          <Route path="/custom-code" element={<CustomCodeDashboard />} />
          <Route
            path="/elements"
            element={
              sessionToken ? (
                <ElementsDashboard />
              ) : (
                <AuthScreen onAuth={() => {}} />
              )
            }
          />{" "}
        </Routes>
      </Box>
      <DevTools logout={logout} setHasClickedFetch={setHasClickedFetch} />
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
