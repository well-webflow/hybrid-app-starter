import { useState, useCallback } from "react";
import { customCodeApi } from "../../services/customCode";
import { CustomCode } from "../../types/types";

/**
 * Hook for managing script selection and application in the custom code interface
 * Provides functionality to select, fetch, and apply scripts to sites or pages
 *
 * @returns {Object} Object containing:
 *   - selectedScript: Currently selected script
 *   - registeredScripts: Array of available scripts
 *   - isLoading: Loading state for async operations
 *   - selectScript: Function to select a script
 *   - fetchScripts: Function to fetch available scripts
 *   - applyScript: Function to apply selected script to target
 */
export function useScriptSelection() {
  const [selectedScript, setSelectedScript] = useState<CustomCode | null>(null);
  const [registeredScripts, setRegisteredScripts] = useState<CustomCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Updates the currently selected script
   * @param script - The script to select
   */
  const selectScript = useCallback((script: CustomCode) => {
    setSelectedScript(script);
  }, []);

  /**
   * Fetches available scripts for a given site
   * @param siteId - The Webflow site ID
   * @param sessionToken - The user's authentication token
   * @returns Array of registered scripts
   * @throws Will throw an error if the API request fails
   */
  const fetchScripts = useCallback(
    async (siteId: string, sessionToken: string) => {
      setIsLoading(true);
      try {
        const response = await customCodeApi.getScripts(siteId, sessionToken);
        if (response.registeredScripts) {
          setRegisteredScripts(response.registeredScripts);
          return response.registeredScripts;
        }
      } catch (error) {
        console.error("Error fetching scripts:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Applies the selected script to specified target(s)
   * @param targetType - Type of target ("site" or "page")
   * @param targetId - ID or array of IDs to apply the script to
   * @param location - Where to apply the script ("header" or "footer")
   * @param sessionToken - The user's authentication token
   * @throws Will throw an error if the API request fails or no script is selected
   */
  const applyScript = useCallback(
    async (
      targetType: "site" | "page",
      targetId: string | string[],
      location: "header" | "footer",
      sessionToken: string
    ) => {
      if (!selectedScript) return;

      setIsLoading(true);
      try {
        // Handle multiple page IDs
        if (Array.isArray(targetId)) {
          for (const id of targetId) {
            await customCodeApi.applyScript(
              {
                scriptId: selectedScript.id || "",
                targetType: "page",
                targetId: id,
                location,
                version: selectedScript.version,
              },
              sessionToken
            );
          }
        } else {
          await customCodeApi.applyScript(
            {
              scriptId: selectedScript.id || "",
              targetType,
              targetId,
              location,
              version: selectedScript.version,
            },
            sessionToken
          );
        }
      } catch (error) {
        console.error("Error applying script:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [selectedScript]
  );

  return {
    selectedScript,
    registeredScripts,
    isLoading,
    selectScript,
    fetchScripts,
    applyScript,
  };
}
