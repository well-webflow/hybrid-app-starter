const base_url = import.meta.env.VITE_NEXTJS_API_URL;

interface ScriptData {
  sourceCode: string;
  displayName: string;
  version: string;
}

interface RegisterScriptParams {
  siteId: string;
  isHosted: boolean;
  scriptData: ScriptData;
}

interface ApplyScriptParams {
  scriptId: string;
  targetType: "site" | "page";
  targetId: string;
  location: "header" | "footer";
  version: string;
}

export const customCodeApi = {
  // Register a new script
  registerScript: async (params: RegisterScriptParams, token: string) => {
    const response = await fetch(`${base_url}/api/custom-code/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    return response.json();
  },

  // Get list of registered scripts
  getScripts: async (siteId: string, token: string) => {
    const response = await fetch(
      `${base_url}/api/custom-code/register?siteId=${siteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  },

  // Apply script to site or page
  applyScript: async (params: ApplyScriptParams, token: string) => {
    const response = await fetch(`${base_url}/api/custom-code/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    return response.json();
  },

  // Get status for site
  getSiteStatus: async (siteId: string, token: string) => {
    const response = await fetch(
      `${base_url}/api/custom-code/status?targetType=site&targetId=${siteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  },

  // Get status for pages
  getPagesStatus: async (pageIds: string[], token: string) => {
    const response = await fetch(
      `${base_url}/api/custom-code/status?targetType=page&targetIds=${pageIds.join(
        ","
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  },

  // Get batch status request
  getBatchStatus: async (
    siteId: string,
    pageIds: string[] = [],
    token: string
  ) => {
    try {
      // Validate siteId
      if (!siteId || siteId === "page") {
        console.warn("Invalid siteId provided to getBatchStatus:", siteId);
        return {};
      }

      // If no pageIds provided, just get site status
      if (!pageIds || pageIds.length === 0) {
        const siteStatus = await customCodeApi.getSiteStatus(siteId, token);
        return siteStatus.result || {};
      }

      const batchSize = 5;
      const pagesBatches = [];

      for (let i = 0; i < pageIds.length; i += batchSize) {
        pagesBatches.push(pageIds.slice(i, i + batchSize));
      }

      // Get site status
      const siteStatus = await customCodeApi.getSiteStatus(siteId, token);

      // Get pages status in batches
      const pagesStatus = { result: {} };
      for (const batch of pagesBatches) {
        const batchStatus = await customCodeApi.getPagesStatus(batch, token);
        pagesStatus.result = { ...pagesStatus.result, ...batchStatus.result };
      }

      return {
        ...siteStatus.result,
        ...pagesStatus.result,
      };
    } catch (error) {
      console.error(
        "Error in getBatchStatus:",
        { siteId, pageIdsLength: pageIds?.length },
        error
      );
      return {};
    }
  },
};
