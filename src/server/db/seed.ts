/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "./index";
import { user, urls, account } from "./schema";
import { nanoid } from "nanoid";
import { randomUUID } from "crypto";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

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
      },
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
          },
        ];

        for (const accountData of oauthAccounts) {
          await db
            .insert(account)
            .values(accountData)
            .onConflictDoNothing();
          console.log(
            `✅ Created ${accountData.provider} account for: ${userData.email}`
          );
        }
      } catch (error) {
        console.error(`❌ Error creating user ${userData.email}:`, error);
      }
    }

    // Fetch existing user IDs from the database
    const existingTestUser = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, "test@example.com"))
      .limit(1);
    const existingDemoUser = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, "demo@example.com"))
      .limit(1);

    const user1Id = existingTestUser[0]?.id || testUsers[0].id;
    const user2Id = existingDemoUser[0]?.id || testUsers[1].id;

    // Create test URLs with proper schema typing
    const testUrls: Array<typeof urls.$inferInsert> = [
      {
        originalUrl: "https://github.com/vercel/next.js/releases/tag/v15.2.0",
        shortCode: "next152",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 142,
        userId: user1Id,
        flagged: false,
      },
      {
        originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        shortCode: "rickroll",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 500,
        userId: user2Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://www.amazon.com/Apple-AirPods-Pro-2nd-Generation/dp/B0D7KQD8R1",
        shortCode: "airpods",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 320,
        userId: user1Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://www.nytimes.com/2025/03/24/technology/ai-breakthroughs.html",
        shortCode: "ai2025",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 87,
        userId: user2Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
        shortCode: "jspromise",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 210,
        userId: user1Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://www.reddit.com/r/explainlikeimfive/comments/123abc/eli5_why_does_time_slow_near_black_holes/",
        shortCode: "blackhole",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 95,
        userId: user2Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://www.nasa.gov/mission_pages/webb/news/webb-captures-new-image-of-galaxy-cluster",
        shortCode: "webbimg",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 180,
        userId: user1Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://www.tesla.com/en_us/model3/design#overview",
        shortCode: "model3",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 400,
        userId: user2Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://www.theguardian.com/environment/2025/mar/25/climate-change-impact-report",
        shortCode: "climate25",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 73,
        userId: null, // Anonymous
        flagged: true,
        flagReason: "Content under review",
      },
      {
        originalUrl:
          "https://stackoverflow.com/questions/123456/how-to-use-async-await-in-node-js",
        shortCode: "asyncnode",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 250,
        userId: user1Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://www.netflix.com/title/81234567?source=web",
        shortCode: "nflxshow",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 300,
        userId: user2Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://www.bbc.com/news/world-us-canada-67890123",
        shortCode: "usnews",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 120,
        userId: user1Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://www.microsoft.com/en-us/windows/windows-11-specifications",
        shortCode: "win11",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 190,
        userId: user2Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://www.wikipedia.org/wiki/Artificial_intelligence",
        shortCode: "aiwiki",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 600,
        userId: null, // Anonymous
        flagged: false,
      },
      {
        originalUrl:
          "https://www.linkedin.com/pulse/how-build-career-tech-2025-john-doe",
        shortCode: "techcareer",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 85,
        userId: user1Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://www.spotify.com/us/premium/?ref=web_footer",
        shortCode: "spotifyprem",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 230,
        userId: user2Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://www.apple.com/iphone-16-pro/specs/",
        shortCode: "iphone16",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 350,
        userId: user1Id,
        flagged: false,
      },
      {
        originalUrl:
          "https://arxiv.org/abs/2503.12345",
        shortCode: "arxiv25",
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 45,
        userId: null, // Anonymous
        flagged: false,
      },
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