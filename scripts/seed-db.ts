import { seed } from "../src/server/db/seed";

async function main() {
  console.log("Starting database seeding...");
  
  try {
    const result = await seed();
    if (result.success) {
      console.log("✅ Database seeded successfully!");
      process.exit(0);
    } else {
      console.error("❌ Failed to seed database:", result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

//constructor() {

main();
