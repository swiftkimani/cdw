// Run with: npx ts-node -r tsconfig-paths/register --compiler-options '{"module":"CommonJS"}' prisma/seed/fix-admin-currency.ts
import { prisma } from "@/lib/prisma";
import { bcryptPasswordHash } from "@/lib/bcrypt";

async function fixAdminAndCurrency() {
  const email = "benkim388@gmail.com";
  const password = "abc123#";

  console.log("🔧 Fixing admin user and currency...\n");

  // 1. Upsert admin user
  const hashedPassword = await bcryptPasswordHash(password);
  
  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      hashedPassword,
    },
    create: {
      email,
      hashedPassword,
    },
  });

  console.log("✅ Admin user ready:");
  console.log(`   Email: ${admin.email}`);
  console.log(`   Password: ${password}`);
  console.log("");

  // 2. Update all classifieds to use KES currency
  const updated = await prisma.classified.updateMany({
    where: {
      currency: {
        not: "KES",
      },
    },
    data: {
      currency: "KES",
    },
  });

  console.log(`✅ Updated ${updated.count} classifieds to use KES currency\n`);

  // 3. Clear any existing sessions to force re-login
  await prisma.session.deleteMany({
    where: {
      user: {
        email,
      },
    },
  });

  console.log("✅ Cleared existing sessions - please log in again\n");
  console.log("🚀 Done! You can now log in at /auth/sign-in");
}

fixAdminAndCurrency()
  .catch(console.error)
  .finally(() => process.exit(0));
