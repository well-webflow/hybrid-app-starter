import { NextRequest, NextResponse } from "next/server";
import { WebflowClient } from "webflow-api";
import { ScriptController } from "../../../controllers/scriptControllers";
import jwt from "../../../utils/jwt";

// Get Custom Code Status
export async function GET(request: NextRequest) {
  try {
    const accessToken = await jwt.verifyAuth(request);
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const targetType = searchParams.get("targetType");
    const targetId = searchParams.get("targetId");

    if (!targetType || !targetId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const webflow = new WebflowClient({ accessToken });
    const scriptController = new ScriptController(webflow);

    let result;
    if (targetType === "site") {
      result = await scriptController.getSiteCustomCode(targetId);
    } else if (targetType === "page") {
      result = await scriptController.getPageCustomCode(targetId);
    } else {
      return NextResponse.json(
        { error: "Invalid target type" },
        { status: 400 }
      );
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching custom code status:", error);
    return NextResponse.json(
      { error: "Failed to fetch custom code status" },
      { status: 500 }
    );
  }
}
