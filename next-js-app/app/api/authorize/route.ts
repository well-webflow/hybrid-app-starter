import { WebflowClient } from "webflow-api";
import { NextResponse } from "next/server";

// Redirect to Webflow's authorization URL
export async function GET() {
  const authorizeUrl = WebflowClient.authorizeURL({
    scope: ["sites:read", "authorized_user:read"],
    clientId: process.env.WEBFLOW_CLIENT_ID!,
  });

  return NextResponse.redirect(authorizeUrl);
}
