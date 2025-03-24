import { resetDatabase } from "../src/server/db/reset";
import { seed } from "../src/server/db/seed";

async function main() {
  console.log("🔄 Setting up database...");

  console.log("\n1. Resetting database...");
  const resetResult = await resetDatabase();
  if (!resetResult.success) {
    console.error("Database reset failed:", resetResult.error);
    process.exit(1);
  }

  console.log("\n2. Seeding database...");
  const seedResult = await seed();
  if (!seedResult.success) {
    console.error("Database seeding failed:", seedResult.error);
    process.exit(1);
  }

  console.log("\n✅ Database setup completed successfully!");
  process.exit(0);
}

main().catch((error) => {
  console.error("Uncaught error:", error);
  process.exit(1);
});
