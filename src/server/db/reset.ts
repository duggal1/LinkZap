/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "./index";
import * as schema from "./schema";
import { sql } from "drizzle-orm";

/**
 * Reset the database by dropping all tables and recreating them from scratch
 */
export async function resetDatabase() {
  console.log("🗑️  Dropping existing tables...");
  
  try {
    // Drop tables in the correct order to respect foreign key constraints
    await db.execute(sql`DROP TABLE IF EXISTS "session" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "account" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "urls" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "verification_token" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "users" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "user" CASCADE`);
    
    // Drop enums
    await db.execute(sql`DROP TYPE IF EXISTS "user_role" CASCADE`);
    
    console.log("✅ All tables dropped");
    
    // Create tables again using the schema
    console.log("🏗️  Recreating tables...");
    
    // Create enums first
    await db.execute(sql`CREATE TYPE "user_role" AS ENUM ('user', 'admin')`);
    
    // Create tables in the correct order
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" varchar(255) NOT NULL PRIMARY KEY,
        "name" varchar(255),
        "email" varchar(255) NOT NULL UNIQUE,
        "emailVerified" timestamp,
        "image" text,
        "password" text,
        "role" "user_role" NOT NULL DEFAULT 'user',
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now()
      )
    `);
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "account" (
        "provider" varchar(255) NOT NULL,
        "providerAccountId" varchar(255) NOT NULL,
        "userId" varchar(255) NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "type" varchar(255) NOT NULL,
        "refresh_token" text,
        "access_token" text,
        "expires_at" integer,
        "token_type" varchar(255),
        "scope" varchar(255),
        "id_token" text,
        "session_state" varchar(255),
        PRIMARY KEY("provider", "providerAccountId")
      )
    `);
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "session" (
        "session_token" varchar(255) NOT NULL PRIMARY KEY,
        "user_id" varchar(255) NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "expires" timestamp NOT NULL
      )
    `);
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "verification_token" (
        "identifier" varchar(255) NOT NULL,
        "token" varchar(255) NOT NULL,
        "expires" timestamp NOT NULL,
        PRIMARY KEY("identifier", "token")
      )
    `);
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "urls" (
        "id" serial PRIMARY KEY,
        "original_url" varchar(2000) NOT NULL,
        "short_code" varchar(10) NOT NULL UNIQUE,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "clicks" integer NOT NULL DEFAULT 0,
        "user_id" varchar(255) REFERENCES "user"("id") ON DELETE SET NULL,
        "flagged" boolean NOT NULL DEFAULT false,
        "flag_reason" text
      )
    `);
    
    console.log("✅ All tables created successfully");
    
    return { success: true };
  } catch (error) {
    console.error("❌ Error resetting database:", error);
    return { success: false, error };
  }
}