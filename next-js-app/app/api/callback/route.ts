import { WebflowClient } from "webflow-api";
import { NextRequest, NextResponse } from "next/server";
import db from "../../utils/database";

// Exchange the authorization code for an access token and store it in the database
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

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

  // Get site ID to pair with the authorization access token
  const sites = await webflow.sites.list();
  sites?.sites?.forEach((site) => {
    db.insertSiteAuthorization(site.id, accessToken);
  });

  // Check if this is a popup window (from App.tsx) or direct navigation
  const isPopup = request.headers.get("sec-fetch-dest") === "document";

  if (isPopup) {
    // Return HTML directly instead of trying to fetch a file
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
    // Redirect URI with first site for direct navigation
    const firstSite = sites?.sites?.[0];
    if (firstSite) {
      return NextResponse.redirect(
        `https://${firstSite.shortName}.design.webflow.com?app=${process.env.WEBFLOW_CLIENT_ID}`
      );
    }
  }
}
