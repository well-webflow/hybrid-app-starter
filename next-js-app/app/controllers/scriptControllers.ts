import { WebflowClient } from "webflow-api";
import Sri from "subresource-integrity";
import {
  CustomCodeHostedRequest,
  CustomCodeInlineRequest,
} from "webflow-api/api/resources/scripts";

export class ScriptController {
  // Webflow Client
  private webflow: WebflowClient;

  // Constructor
  constructor(webflow: WebflowClient) {
    this.webflow = webflow;
  }

  // Get Registered Scripts
  async getRegisteredScripts(siteId: string) {
    try {
      const data = await this.webflow.scripts.list(siteId);
      return data.registeredScripts;
    } catch (error) {
      console.error("Error fetching scripts:", error);
    }
  }

  // Register Inline Script
  async registerInlineScript(siteId: string, request: CustomCodeInlineRequest) {
    try {
      const scriptData = {
        sourceCode: request.sourceCode,
        canCopy: request.canCopy ?? true,
        version: request.version,
        displayName: request.displayName,
      };

      return await this.webflow.scripts.registerInline(siteId, scriptData);
    } catch (error) {
      console.error("Error registering inline script:", error);
      throw error;
    }
  }

  // Register Hosted Script
  async registerHostedScript(siteId: string, request: CustomCodeHostedRequest) {
    try {
      // Check if Host Location is provided
      if (!request.hostedLocation) {
        throw new Error("Hosted location is required");
      }
      // Generate Integrity Hash
      const integrityHash = await this.generateSRI(request.hostedLocation);

      const scriptData = {
        hostedLocation: request.hostedLocation,
        integrityHash: integrityHash,
        canCopy: request.canCopy ?? true,
        version: request.version,
        displayName: request.displayName,
      };
      // Register Script
      return await this.webflow.scripts.registerHosted(siteId, scriptData);
    } catch (error) {
      console.error("Error registering hosted script:", error);
      throw error;
    }
  }

  // Generate Integrity Hash
  private async generateSRI(url: string): Promise<string> {
    const response = await fetch(url);
    const data = await response.text();
    const integrity = await Sri.generate(data);
    return integrity;
  }

  // Site-level Operations

  // Get Site Custom Code
  async getSiteCustomCode(siteId: string) {
    try {
      return await this.webflow.scripts.listCustomCodeBlocks(siteId);
    } catch (error) {
      console.error("Error fetching site custom code:", error);
      throw error;
    }
  }

  //   Upsert Site Custom Code
  async upsertSiteCustomCode(
    siteId: string,
    scriptId: string,
    location: "header" | "footer",
    version: string
  ) {
    try {
      // Get existing scripts first
      const response = await this.webflow.sites.scripts.getCustomCode(siteId);
      const existingScripts = response.scripts || [];

      //   Add new script to existing ones
      existingScripts.push({
        id: scriptId,
        location: location,
        version: version,
      });

      //   Create scriptApplyList
      const scriptApplyList = {
        scripts: existingScripts,
      };

      return await this.webflow.sites.scripts.upsertCustomCode(
        siteId,
        scriptApplyList
      );
    } catch (error) {
      console.error("Error upserting site custom code:", error);
      throw error;
    }
  }

  // Delete Site Custom Code
  async deleteSiteCustomCode(siteId: string) {
    try {
      return await this.webflow.sites.scripts.deleteCustomCode(siteId);
    } catch (error) {
      console.error("Error deleting site custom code:", error);
      throw error;
    }
  }

  // Page-level Operations

  // Get Page Custom Code
  async getPageCustomCode(pageId: string) {
    try {
      return await this.webflow.pages.scripts.getCustomCode(pageId);
    } catch (error) {
      console.error("Error fetching page custom code:", error);
      throw error;
    }
  }

  // Upsert Page Custom Code(
  async upsertPageCustomCode(
    pageId: string,
    scriptId: string,
    location: "header" | "footer",
    version: string
  ) {
    try {
      // Get existing scripts first
      const response = await this.webflow.pages.scripts.getCustomCode(pageId);
      const existingScripts = response.scripts || [];

      //   Add new script to existing ones
      existingScripts.push({
        id: scriptId,
        location: location,
        version: version,
      });

      //   Create scriptApplyList
      const scriptApplyList = {
        scripts: existingScripts,
      };

      //   Upsert custom code
      return await this.webflow.pages.scripts.upsertCustomCode(
        pageId,
        scriptApplyList
      );
    } catch (error) {
      console.error("Error upserting page custom code:", error);
      throw error;
    }
  }

  // Delete Page Custom Code
  async deletePageCustomCode(pageId: string) {
    try {
      return await this.webflow.pages.scripts.deleteCustomCode(pageId);
    } catch (error) {
      console.error("Error deleting page custom code:", error);
      throw error;
    }
  }
}
