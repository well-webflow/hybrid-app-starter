import { useState, useCallback, useRef } from "react";
import { customCodeApi } from "../../services/customCode";
import { ApplicationStatus, ScriptStatus } from "../../types/types";

/**
 * Hook for managing and tracking the application status of scripts
 * Provides functionality to check where scripts are applied across a site and its pages
 *
 * @param sessionToken - The user's authentication token
 * @param scriptId - The ID of the script to track
 * @returns {Object} Object containing:
 *   - applicationStatus: Current status of script application
 *   - isLoading: Loading state for status checks
 *   - fetchStatus: Function to fetch latest status
 */
export function useApplicationStatus(sessionToken: string, scriptId?: string) {
  // Track application status state
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  // Cache to prevent unnecessary API calls
  // Key format: `${siteId}-${scriptId}`
  const statusCache = useRef<Record<string, ApplicationStatus>>({});

  /**
   * Fetch the application status for a script across site/pages
   * Checks both site-level and page-level applications of the script
   *
   * @param siteId - The Webflow site ID to check
   * @param pageIds - Optional array of page IDs to check status for
   * @returns Object mapping targets (site/pages) to their application status
   * @throws Will throw an error if the API request fails
   */
  const fetchStatus = useCallback(
    async (siteId: string, pageIds: string[] = []) => {
      if (!scriptId) {
        return {};
      }

      // Check cache first to avoid unnecessary API calls
      const cacheKey = `${siteId}-${scriptId}`;
      if (statusCache.current[cacheKey]) {
        setApplicationStatus(statusCache.current[cacheKey]);
        return statusCache.current[cacheKey];
      }

      setIsLoading(true);
      try {
        const status = await customCodeApi.getBatchStatus(
          siteId,
          pageIds,
          sessionToken
        );

        // Process and format the status response
        // Converts the raw API response into a more usable format
        const filteredStatus: ApplicationStatus = {};
        Object.entries(status as Record<string, ScriptStatus>).forEach(
          ([pageId, scripts]) => {
            filteredStatus[pageId] = {
              isApplied: Boolean(scripts[scriptId]),
              location: scripts[scriptId]?.location,
            };
          }
        );

        // Update cache and state with the new status
        statusCache.current[cacheKey] = filteredStatus;
        setApplicationStatus(filteredStatus);
        return filteredStatus;
      } catch (error) {
        console.error("Error fetching status:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [sessionToken, scriptId]
  );

  return {
    applicationStatus,
    isLoading,
    fetchStatus,
  };
}
