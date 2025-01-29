import { WebflowClient } from "webflow-api";
import { NextResponse } from "next/server";
import { OauthScope } from "webflow-api/api/types/OAuthScope";

/**
 * Authorize API Route Handler
 * --------------------------
 * This route generates and redirects to Webflow's authorization URL.
 */

const scopes = [
  "sites:read",
  "sites:write",
  "custom_code:read",
  "custom_code:write",
  "authorized_user:read",
];

export async function GET() {
  const authorizeUrl = WebflowClient.authorizeURL({
    scope: scopes as OauthScope[],
    clientId: process.env.WEBFLOW_CLIENT_ID!,
  });

  return NextResponse.redirect(authorizeUrl);
}
