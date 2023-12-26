import { PrismaClient } from "@prisma/client";

async function resetDatabase() {
  const prisma = new PrismaClient();

  try {
    // Delete all existing data
    //
    console.log("deleting rows...");
    console.log("------------------------------------------");

    await prisma.session.deleteMany();
    console.log("deleting sessions...");
    await prisma.challenge.deleteMany();
    console.log("deleting challenges...");

    console.log("------------------------------------------");

    console.log("Database reset completed.");
  } catch (error) {
    console.error("Error resetting the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the resetDatabase function
resetDatabase();
