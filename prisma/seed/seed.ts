import { PrismaClient } from "@prisma/client";
import { seedAdmin } from "./admin.seed";
import { seedTaxonomy } from "./taxonomy.seed";

const prisma = new PrismaClient();

async function main() {
  console.log("testing prisma connection");
  await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE`;
  // await prisma.$executeRaw`TRUNCATE TABLE "classifieds" RESTART IDENTITY CASCADE`;
  await seedTaxonomy(prisma);
  // await seedClassifieds(prisma);
  // await seedImages(prisma);
  await seedAdmin(prisma);
  // await seedCustomers(prisma);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
