import { useQuery } from "@tanstack/react-query";

/*
  Custom hook for fetching sites from the Next.js API. This hook is used to fetch sites for the current user, by sending the session token as an authorization header.
*/
export function useSites(sessionToken: string, hasClickedFetch: boolean) {
  const base_url = import.meta.env.VITE_NEXTJS_API_URL;

  const result = useQuery({
    queryKey: ["sites", sessionToken],
    queryFn: async () => {
      // Return empty array if no session token
      if (!sessionToken) {
        return [];
      }
      // Fetch sites from Next.js API
      const response = await fetch(`${base_url}/api/sites`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch sites: ${response.statusText}`);
      }

      // Parse response and return sites
      const data = await response.json();
      return data.data.sites || [];
    },
    // Only fetch sites if session token is present and fetch button has been clicked
    enabled: Boolean(sessionToken) && hasClickedFetch,
  });

  const {
    data: sites = [],
    isLoading,
    isError,
    error,
    refetch: fetchSites,
  } = result;

  return {
    sites,
    isLoading,
    isError,
    error,
    fetchSites,
  };
}
