import { useState } from "react";
import { customCodeApi } from "../../services/customCode";
import { CustomCode } from "../../types/types";

export function useScriptRegistration(sessionToken: string, siteId: string) {
  const [isRegistering, setIsRegistering] = useState(false);

  const registerScript = async (code: string, isHosted: boolean) => {
    if (!sessionToken || !siteId) return;

    setIsRegistering(true);
    try {
      const { result } = await customCodeApi.registerScript(
        {
          siteId,
          isHosted,
          scriptData: {
            hostedLocation: code,
            sourceCode: code,
            displayName: `Boilerplate Script ${Date.now()}`,
            version: "1.0.0",
          },
        },
        sessionToken
      );

      return result;
    } catch (error) {
      console.error("Error registering script:", error);
      throw error;
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    registerScript,
    isRegistering,
  };
}
