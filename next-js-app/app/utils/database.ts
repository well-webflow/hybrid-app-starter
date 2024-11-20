import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Database as SQLiteDatabase } from "sqlite";
import { mkdir } from "fs/promises";
// import { join } from "path";

// Singleton pattern to maintain one database connection
let db: SQLiteDatabase | null = null;

async function getDb() {
  if (!db) {
    const dbPath = "./db/database.db";
    const dbDir = "./db";

    try {
      // Ensure the directory exists
      await mkdir(dbDir, { recursive: true });

      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });

      // Create tables if they don't exist
      await db.exec(`
        CREATE TABLE IF NOT EXISTS siteAuthorizations (
          siteId TEXT PRIMARY KEY,
          accessToken TEXT
        );
        
        CREATE TABLE IF NOT EXISTS userAuthorizations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId TEXT,
          accessToken TEXT
        );
      `);
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }
  return db;
}

export async function insertSiteAuthorization(
  siteId: string,
  accessToken: string
) {
  const db = await getDb();
  const existing = await db.get(
    "SELECT * FROM siteAuthorizations WHERE siteId = ?",
    [siteId]
  );

  if (existing) {
    console.log("Site auth already exists:", existing);
    return existing;
  }

  await db.run(
    "INSERT INTO siteAuthorizations (siteId, accessToken) VALUES (?, ?)",
    [siteId, accessToken]
  );
  console.log("Site authorization pairing inserted successfully.");
}

export async function insertUserAuthorization(
  userId: string,
  accessToken: string
) {
  const db = await getDb();
  const existing = await db.get(
    "SELECT * FROM userAuthorizations WHERE userId = ?",
    [userId]
  );

  if (existing) {
    console.log("Access token pairing already exists:", existing);
    return existing;
  }

  await db.run(
    "INSERT INTO userAuthorizations (userId, accessToken) VALUES (?, ?)",
    [userId, accessToken]
  );
  console.log("User access token pairing inserted successfully.");
}

export async function getAccessTokenFromSiteId(
  siteId: string
): Promise<string> {
  const db = await getDb();
  const row = await db.get(
    "SELECT accessToken FROM siteAuthorizations WHERE siteId = ?",
    [siteId]
  );

  if (!row?.accessToken) {
    throw new Error("No access token found or site does not exist");
  }

  return row.accessToken;
}

export async function getAccessTokenFromUserId(
  userId: string
): Promise<string> {
  const db = await getDb();
  const row = await db.get(
    "SELECT accessToken FROM userAuthorizations WHERE userId = ?",
    [userId]
  );

  if (!row?.accessToken) {
    throw new Error("No access token found or user does not exist");
  }

  return row.accessToken;
}

export async function clearDatabase() {
  const db = await getDb();
  await db.run("DELETE FROM siteAuthorizations");
  await db.run("DELETE FROM userAuthorizations");
  console.log("Database cleared successfully");
}

const database = {
  getAccessTokenFromSiteId,
  getAccessTokenFromUserId,
  insertSiteAuthorization,
  insertUserAuthorization,
  clearDatabase,
};

export default database;
