import { WebflowClient } from "webflow-api";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/utils/database";

/**
 * Callback API Route Handler
 * -------------------------
 * This route processes the OAuth callback from Webflow after a user authorizes the application.
 *
 * Flow:
 * 1. Receives authorization code from Webflow
 * 2. Exchanges code for access token
 * 3. Retrieves user's Webflow sites
 * 4. Stores site authorization details
 * 5. Handles response based on access method (popup vs direct)
 *
 * @param {NextRequest} request - The incoming request object containing:
 *   - searchParams: URL parameters including the authorization 'code'
 *   - headers: Request headers to determine if accessed via popup
 *
 * @returns {Promise<NextResponse>}
 *   - For popup windows: Returns HTML to close window and notify parent
 *   - For direct navigation: Redirects to the first authorized Webflow site
 *   - On error: Returns 400 status if no code provided
 *
 * @requires {WEBFLOW_CLIENT_ID} - Environment variable for OAuth client ID
 * @requires {WEBFLOW_CLIENT_SECRET} - Environment variable for OAuth client secret
 */
export async function GET(request: NextRequest) {
  // Get the authorization code from the request
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  // If no code, return a 400 error
  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  // Get Access Token
  const accessToken = await WebflowClient.getAccessToken({
    clientId: process.env.WEBFLOW_CLIENT_ID!,
    clientSecret: process.env.WEBFLOW_CLIENT_SECRET!,
    code: code,
  });

  // Instantiate the Webflow Client
  const webflow = new WebflowClient({ accessToken });

  // Get Site ID to pair with the  access token
  const sites = await webflow.sites.list();

  // Store each site's ID and access token pair in the database for future API requests
  sites?.sites?.forEach((site) => {
    db.insertSiteAuthorization(site.id, accessToken);
  });

  const authInfo = await webflow.token.introspect()
  console.log(authInfo)

  // Check if the authorization request came from our Webflow designer extension
  const isAppPopup = searchParams.get("state") === "webflow_designer";
  console.log("isAppPopup", isAppPopup)

  // If the request is from a popup window, return HTML to close the window
  if (isAppPopup) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Authorization Complete</title>
        </head>
        <body>
          <script>
            window.opener.postMessage('authComplete', '*');
            window.close();
          </script>
        </body>
      </html>`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } else {
    // If authorized to the Workspace - redirect to the Dashboard
    const workspaceIds = authInfo?.authorization?.authorizedTo?.workspaceIds
    console.log("workspaceIds", workspaceIds)
    if (workspaceIds && workspaceIds.length > 0) {
      return NextResponse.redirect(
        `https:/webflow.com/dashboard?workspace=${workspaceIds[0]}`
      );
    } else {
      // If authorized to the Site - redirect to the Designer Extension
      const firstSite = sites?.sites?.[0];
      if (firstSite) {
        return NextResponse.redirect(
          `https://${firstSite.shortName}.design.webflow.com?app=${process.env.WEBFLOW_CLIENT_ID}`
        );
      }
    }
    }
}
