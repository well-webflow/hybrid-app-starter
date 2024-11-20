interface UseDevToolsProps {
  logout: () => void;
  setHasClickedFetch?: (value: boolean) => void;
}

export function useDevTools({ logout, setHasClickedFetch }: UseDevToolsProps) {
  const clearEverything = async () => {
    try {
      // 1. Set the explicit logout flag first
      localStorage.setItem("explicitly_logged_out", "true");

      // 2. Clear all storage
      localStorage.clear();
      sessionStorage.clear();

      // 3. Reset React state
      setHasClickedFetch?.(false);

      // 4. Make the API call
      const base_url = import.meta.env.VITE_NEXTJS_API_URL;
      const response = await fetch(`${base_url}/api/dev/clear`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to clear database");

      // 5. Finally logout
      logout();

      console.log("Everything cleared successfully");
      return true;
    } catch (error) {
      console.error("Error clearing everything:", error);
      return false;
    }
  };

  const logStorage = () => {
    console.log("Local Storage:", { ...localStorage });
    console.log("Session Storage:", { ...sessionStorage });
  };

  return {
    clearSession: clearEverything, // Renamed for clarity
    logStorage,
  };
}
