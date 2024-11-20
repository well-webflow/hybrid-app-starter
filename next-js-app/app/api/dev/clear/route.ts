import chalk from "chalk";
import { NextResponse } from "next/server";
import database from "../../../utils/database";

export async function POST() {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }

  try {
    await database.clearDatabase();
    console.log(
      "\n" + chalk.bold.green("=== Database cleared successfully ===")
    );
    return NextResponse.json(
      { message: "Database cleared successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing database:", error);
    return NextResponse.json(
      { error: "Failed to clear database" },
      { status: 500 }
    );
  }
}
