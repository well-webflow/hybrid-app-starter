import { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, Box } from '@mui/material';
import { Navigation } from './components/Navigation';
import { CustomCodeDashboard } from './components/CustomCode/CustomCodeDashboard';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import { DevTools } from './components/DevTools';
import { useAuth } from './hooks/useAuth'; // Manages authentication state and provides login/logout functionality
import { useSites } from './hooks/useSites'; // Fetches and manages site data using the session token
import { theme } from './components/theme';
import { ElementsDashboard } from './components/Elements/ElementsDashboard';
import { WaterfallProvider } from './context/waterfallContext';
import Layout from './Layout';
import InitializationView from './views/InitializationView';
import CreateView from './views/CreateView';
import EditView from './views/EditView';
import CategoryView from './views/CategoryView';
import CodeView from './views/CodeView';

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

// This is the main App Component. It handles the initial setup and rendering of the Dashboard.
function AppContent() {
  const [hasClickedFetch, setHasClickedFetch] = useState(false);
  const { user, sessionToken, exchangeAndVerifyIdToken, logout } = useAuth();
  const { sites, isLoading, isError, error, fetchSites } = useSites(
    sessionToken,
    hasClickedFetch
  );

  // Move ref outside useEffect to persist across renders
  const hasCheckedToken = useRef(false);

  useEffect(() => {
    // Set the extension size to large
    webflow.setExtensionSize('large');

    // Only run auth flow if not already checked
    if (!hasCheckedToken.current) {
      const storedUser = localStorage.getItem('wf_hybrid_user');
      const wasExplicitlyLoggedOut = localStorage.getItem(
        'explicitly_logged_out'
      );

      if (storedUser && !wasExplicitlyLoggedOut) {
        exchangeAndVerifyIdToken();
      }
      hasCheckedToken.current = true;
    }

    // Handle the authentication complete event
    const handleAuthComplete = async (event: MessageEvent) => {
      if (event.data === 'authComplete') {
        localStorage.removeItem('explicitly_logged_out');
        await exchangeAndVerifyIdToken();
      }
    };

    // Add the event listener for the authentication complete event
    window.addEventListener('message', handleAuthComplete);
    return () => {
      window.removeEventListener('message', handleAuthComplete);
      // Reset the check on unmount so it can run again if needed
      hasCheckedToken.current = false;
    };
  }, [exchangeAndVerifyIdToken]);

  // Handle the fetch sites button click
  const handleFetchSites = () => {
    setHasClickedFetch(true);
    fetchSites();
  };

  // Render the app
  return (
    <BrowserRouter>
      <WaterfallProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                // If the user is authenticated, render the dashboard
                sessionToken ? (
                  // <Dashboard user={user} sites={sites} isLoading={isLoading} isError={isError} error={error?.message || ""} onFetchSites={handleFetchSites} />
                  <InitializationView />
                ) : (
                  // If the user is not authenticated, render the auth screen
                  <AuthScreen onAuth={() => {}} />
                )
              }
            />
            <Route path="/code-ex" element={<CustomCodeDashboard />} />
            <Route path="/code" element={<CodeView />} />
            <Route path="/create" element={<CreateView />} />
            <Route path="/edit" element={<EditView />} />
            <Route path="/edit/:categoryName" element={<CategoryView />} />
          </Route>
        </Routes>
      </WaterfallProvider>
      {/* <DevTools logout={logout} setHasClickedFetch={setHasClickedFetch} /> */}
    </BrowserRouter>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
