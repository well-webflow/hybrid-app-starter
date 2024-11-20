import { NextRequest, NextResponse } from "next/server";
import jwt from "../../utils/jwt";
import db from "../../utils/database";

export async function POST(request: NextRequest) {
  // Clone the request since we need to read the body twice
  const clonedRequest = request.clone() as NextRequest;

  const accessToken = await jwt.getAccessToken(clonedRequest);

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const token = body.idToken;

    const response = await fetch("https://api.webflow.com/beta/token/resolve", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        idToken: token,
      }),
    });

    const user = await response.json();

    // Generate a Session Token
    const tokenPayload = await jwt.createSessionToken(user);
    const sessionToken = tokenPayload.sessionToken;
    const expAt = tokenPayload.exp;

    db.insertUserAuthorization(user.id, accessToken);

    return NextResponse.json({ sessionToken, exp: expAt });
  } catch (e) {
    console.error("Unauthorized user", e);
    return NextResponse.json(
      {
        error: "Error: User is not associated with authorization for this site",
      },
      { status: 401 }
    );
  }
}
