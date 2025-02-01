import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customCodeApi } from "../../services/customCode";
import { CustomCode } from "../../types/types";

interface ScriptQueryParams {
  siteId: string;
  sessionToken: string;
}

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
  const [queryParams, setQueryParams] = useState<ScriptQueryParams | null>(
    null
  );
  const queryClient = useQueryClient();

  /**
   * Updates the currently selected script
   * @param script - The script to select
   */
  const selectScript = useCallback((script: CustomCode) => {
    setSelectedScript(script);
  }, []);

  /**
   * Query for fetching available scripts
   */
  const { data: registeredScripts = [], isLoading: isLoadingScripts } =
    useQuery({
      queryKey: ["scripts", queryParams?.siteId, queryParams?.sessionToken],
      queryFn: async () => {
        if (!queryParams) return [];
        const response = await customCodeApi.getScripts(
          queryParams.siteId,
          queryParams.sessionToken
        );
        return response.registeredScripts || [];
      },
      enabled: Boolean(queryParams), // Only fetch when we have params
    });

  /**
   * Mutation for applying scripts
   */
  const { mutateAsync: applyScript, isPending: isApplying } = useMutation({
    mutationFn: async ({
      targetType,
      targetId,
      location,
      sessionToken,
    }: {
      targetType: "site" | "page";
      targetId: string | string[];
      location: "header" | "footer";
      sessionToken: string;
    }) => {
      if (!selectedScript?.id) return;

      if (Array.isArray(targetId)) {
        for (const id of targetId) {
          await customCodeApi.applyScript(
            {
              scriptId: selectedScript.id,
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
            scriptId: selectedScript.id,
            targetType,
            targetId,
            location,
            version: selectedScript.version,
          },
          sessionToken
        );
      }
    },
    onSuccess: () => {
      // Force a refetch of application status immediately after applying
      queryClient.invalidateQueries({
        queryKey: ["applicationStatus"],
      });
    },
  });

  /**
   * Wrapper function to fetch scripts with required parameters
   */
  const fetchScripts = useCallback(
    async (siteId: string, sessionToken: string) => {
      setQueryParams({ siteId, sessionToken });
    },
    []
  );

  return {
    selectedScript,
    registeredScripts,
    isLoading: isLoadingScripts || isApplying,
    selectScript,
    fetchScripts,
    applyScript,
  };
}
