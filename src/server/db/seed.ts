/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "./index";
import { user, urls, account } from "./schema";
import { nanoid } from "nanoid";
import { randomUUID } from "crypto";
import { hash } from "bcryptjs";

/**
 * Seed the database with test data
 */
export async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Create test users with proper schema typing
    const testUsers: Array<typeof user.$inferInsert> = [
      {
        id: randomUUID(),
        name: "Test User",
        email: "test@example.com",
        password: await hash("password123", 10),
        role: "admin", // Making everyone admin for testing
        emailVerified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Demo User",
        email: "demo@example.com",
        password: await hash("demo123", 10),
        role: "admin",
        emailVerified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    console.log("👤 Creating test users...");

    // Insert users and create OAuth accounts for them
    for (const userData of testUsers) {
      try {
        await db.insert(user).values(userData).onConflictDoNothing();
        console.log(`✅ Created user: ${userData.email} (${userData.role})`);

        // Create OAuth accounts for each user
        const oauthAccounts: Array<typeof account.$inferInsert> = [
          {
            userId: userData.id,
            type: "oauth",
            provider: "github",
            providerAccountId: `github-${userData.id}`,
            access_token: "mock-token",
            token_type: "bearer",
            scope: "user",
          },
          {
            userId: userData.id,
            type: "oauth",
            provider: "google",
            providerAccountId: `google-${userData.id}`,
            access_token: "mock-token",
            token_type: "bearer",
            scope: "email profile",
          }
        ];

        for (const accountData of oauthAccounts) {
          await db.insert(account).values(accountData).onConflictDoNothing();
          console.log(`✅ Created ${accountData.provider} account for: ${userData.email}`);
        }
      } catch (error) {
        console.error(`❌ Error creating user ${userData.email}:`, error);
      }
    }

    // Create test URLs with proper schema typing
    const testUrls: Array<typeof urls.$inferInsert> = [
      {
        originalUrl: "https://github.com",
        shortCode: "github",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 42,
        userId: testUsers[0].id,
        flagged: false,
      },
      {
        originalUrl: "https://google.com",
        shortCode: "google",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 100,
        userId: testUsers[1].id,
        flagged: true,
        flagReason: "Security concern",
      },
      // Anonymous URL
      {
        originalUrl: "https://example.com",
        shortCode: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 5,
        userId: null,
        flagged: false,
      }
    ];

    console.log("🔗 Creating test URLs...");

    for (const url of testUrls) {
      try {
        await db.insert(urls).values(url).onConflictDoNothing();
        console.log(`✅ Created URL: ${url.shortCode} -> ${url.originalUrl}`);
      } catch (error) {
        console.error(`❌ Error creating URL ${url.shortCode}:`, error);
      }
    }

    console.log("✅ Seeding completed successfully!");
    return { success: true };
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    return { success: false, error };
  }
}
