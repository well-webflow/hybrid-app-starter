import { useQuery, useQueryClient } from "@tanstack/react-query";
import { customCodeApi } from "../../services/customCode";
import { ApplicationStatus, ScriptStatus } from "../../types/types";

// Maximum number of pages to request at once
const MAX_PAGES_PER_REQUEST = 20;

/**
 * Hook for managing and tracking the application status of scripts
 * Provides functionality to check where scripts are applied across a site and its pages
 *
 * @param sessionToken - The user's authentication token
 * @param scriptId - The ID of the script to track
 * @param siteId - The Webflow site ID to check
 * @param pageIds - Optional array of page IDs to check status for
 * @returns {Object} Object containing application status data and utility functions
 */
export function useApplicationStatus(
  sessionToken: string,
  scriptId?: string,
  siteId?: string,
  pageIds: string[] = []
) {
  const queryClient = useQueryClient();

  // Create a stable query key that won't change with page reordering
  const stablePageKey = pageIds.slice().sort().join(",");
  const queryKey = ["applicationStatus", scriptId, siteId, stablePageKey];

  const {
    data: applicationStatus = {},
    isLoading,
    error,
    refetch: fetchStatus,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!scriptId || !siteId) {
        return {};
      }

      // Get any existing cached data
      const existingData =
        queryClient.getQueryData<ApplicationStatus>(queryKey) || {};

      // Find which pages we need to fetch (don't have cached data for)
      const pagesToFetch = pageIds.filter((pageId) => !existingData[pageId]);

      if (pagesToFetch.length === 0) {
        return existingData;
      }

      // Split pages into chunks to avoid overwhelming the server
      const chunks = [];
      for (let i = 0; i < pagesToFetch.length; i += MAX_PAGES_PER_REQUEST) {
        chunks.push(pagesToFetch.slice(i, i + MAX_PAGES_PER_REQUEST));
      }

      const newStatus: ApplicationStatus = { ...existingData };

      // Process each chunk sequentially to avoid rate limits
      for (const chunk of chunks) {
        const status = await customCodeApi.getBatchStatus(
          siteId,
          chunk,
          sessionToken
        );

        // Process and format the status response
        Object.entries(status as Record<string, ScriptStatus>).forEach(
          ([pageId, scripts]) => {
            newStatus[pageId] = {
              isApplied: Boolean(scripts[scriptId]),
              location: scripts[scriptId]?.location,
            };
          }
        );

        // If there are more chunks, add a small delay
        if (chunks.length > 1) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }

      return newStatus;
    },
    enabled: Boolean(sessionToken && scriptId && siteId),
    staleTime: 60 * 1000, // Consider data fresh for 1 minute
    gcTime: 5 * 60 * 1000, // Keep unused data in cache for 5 minutes
    placeholderData: () => {
      // Try to find data from previous queries that might be relevant
      const previousData = queryClient.getQueriesData<ApplicationStatus>({
        queryKey: ["applicationStatus", scriptId, siteId],
      });

      // Return the most recent matching data if available
      const mostRecent = previousData[0]?.[1];
      if (mostRecent) {
        // Filter to only include requested pageIds
        const filtered: ApplicationStatus = {};
        pageIds.forEach((pageId) => {
          if (mostRecent[pageId]) {
            filtered[pageId] = mostRecent[pageId];
          } else {
            filtered[pageId] = { isApplied: false };
          }
        });
        return filtered;
      }

      // If no previous data, return empty status for each page
      return pageIds.reduce((acc, pageId) => {
        acc[pageId] = { isApplied: false };
        return acc;
      }, {} as ApplicationStatus);
    },
  });

  return {
    applicationStatus,
    isLoading,
    error,
    fetchStatus,
  };
}
