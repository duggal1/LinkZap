import { seed } from "../src/server/db/seed";

async function main() {
  console.log("Starting database seeding...");
  const result = await seed();
  
  if (result.success) {
    console.log("Database seeding completed successfully");
    process.exit(0);
  } else {
    console.error("Database seeding failed:", result.error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Uncaught error:", error);
  process.exit(1);
});
