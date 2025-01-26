import { useState, useCallback, useRef } from "react";
import { customCodeApi } from "../../services/customCode";

interface ApplicationStatus {
  [key: string]: {
    isApplied: boolean;
    location?: "header" | "footer";
  };
}

export function useApplicationStatus(sessionToken: string, scriptId?: string) {
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const statusCache = useRef<Record<string, ApplicationStatus>>({});

  const fetchStatus = useCallback(
    async (siteId: string, pageIds: string[] = []) => {
      // Don't fetch if we don't have a scriptId
      if (!scriptId) {
        return {};
      }

      // Check cache
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

        const filteredStatus: ApplicationStatus = {};
        Object.entries(status).forEach(([pageId, scripts]) => {
          filteredStatus[pageId] = {
            isApplied: Boolean(scripts[scriptId]),
            location: scripts[scriptId]?.location,
          };
        });

        // Cache the results
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
