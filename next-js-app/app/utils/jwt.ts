import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import db from "./database";

// User interface
interface User {
  id: string;
  email: string;
}

// Add this interface above the verifyAuth function
interface JWTPayload {
  user: User;
}

// Create session token
const createSessionToken = async (user: User) => {
  // Encode secret
  const secret = new TextEncoder().encode(process.env.WEBFLOW_CLIENT_SECRET);

  // Create session token
  const sessionToken = await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);

  // Decode token
  const decodedToken = await jwtVerify(sessionToken, secret);

  return {
    sessionToken,
    exp: decodedToken.payload.exp,
  };
};

// Verify authorization header
const verifyAuth = async (request: NextRequest) => {
  const authHeader = request.headers.get("authorization"); // Get authorization header from request
  const sessionToken = authHeader?.split(" ")[1]; // Extract the token from 'Bearer <token>'

  // If no session token, return null
  if (!sessionToken) {
    return null;
  }

  try {
    // Verify session token
    const secret = new TextEncoder().encode(process.env.WEBFLOW_CLIENT_SECRET);
    const { payload } = (await jwtVerify(sessionToken, secret)) as {
      payload: JWTPayload;
    };

    // Get user ID from payload
    const userId = payload.user.id;

    // Get access token from user ID
    const accessToken = await db.getAccessTokenFromUserId(userId as string);

    // Return access token
    return accessToken;
  } catch {
    // If error, return null
    return null;
  }
};

// Helper to get access token from site ID
const getAccessToken = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { siteId } = body;

    // Get the access token from your database or wherever you store it
    const accessToken = await db.getAccessTokenFromSiteId(siteId);

    if (!accessToken) {
      console.error(`No access token found for site ${siteId}`);
      return null;
    }

    return accessToken;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

const jwtUtils = {
  createSessionToken,
  verifyAuth,
  getAccessToken,
};

export default jwtUtils;
