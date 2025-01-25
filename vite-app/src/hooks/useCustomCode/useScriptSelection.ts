import { useState, useCallback } from "react";
import { customCodeApi } from "../../services/customCode";
import { CustomCode } from "../../types/types";

export function useScriptSelection() {
  const [selectedScript, setSelectedScript] = useState<CustomCode | null>(null);
  const [registeredScripts, setRegisteredScripts] = useState<CustomCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const selectScript = useCallback((script: CustomCode) => {
    setSelectedScript(script);
  }, []);

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
