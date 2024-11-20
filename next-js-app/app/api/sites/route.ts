import { NextRequest, NextResponse } from "next/server";
import { WebflowClient } from "webflow-api";
import jwt from "../../utils/jwt";

export async function GET(request: NextRequest) {
  try {
    // Clone the request since we need to read the body twice
    const clonedRequest = request.clone() as NextRequest;

    const accessToken = await jwt.verifyAuth(clonedRequest);

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const webflow = new WebflowClient({ accessToken });
    const data = await webflow.sites.list();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error handling authenticated request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
