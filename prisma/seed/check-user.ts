// Run with: export $(grep -v '^#' .env | xargs) && npx ts-node -r tsconfig-paths/register --compiler-options '{"module":"CommonJS"}' prisma/seed/check-user.ts
import { prisma } from "@/lib/prisma";
import { bcryptPasswordCompare, bcryptPasswordHash } from "@/lib/bcrypt";

async function checkAndFixUser() {
  const email = "benkim388@gmail.com";
  const password = "abc123#";

  console.log("🔍 Checking user in database...\n");

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, hashedPassword: true },
  });

  if (!user) {
    console.log("❌ User not found! Creating...");
    const hashedPassword = await bcryptPasswordHash(password);
    const newUser = await prisma.user.create({
      data: { email, hashedPassword },
    });
    console.log("✅ Created user:", newUser.email);
    return;
  }

  console.log("✅ User found:", user.email);
  console.log("   ID:", user.id);
  console.log("   Has password hash:", !!user.hashedPassword);

  // Test password comparison
  console.log("\n🔐 Testing password match...");
  const match = await bcryptPasswordCompare(password, user.hashedPassword);
  console.log("   Password 'abc123#' matches:", match);

  if (!match) {
    console.log("\n🔧 Password doesn't match. Updating...");
    const newHash = await bcryptPasswordHash(password);
    await prisma.user.update({
      where: { email },
      data: { hashedPassword: newHash },
    });
    console.log("✅ Password updated!");

    // Verify new password
    const verifyUser = await prisma.user.findUnique({
      where: { email },
      select: { hashedPassword: true },
    });
    const newMatch = await bcryptPasswordCompare(
      password,
      verifyUser!.hashedPassword
    );
    console.log("   New password matches:", newMatch);
  }

  console.log("\n🚀 Done! Try logging in with:");
  console.log("   Email:", email);
  console.log("   Password:", password);
}

checkAndFixUser()
  .catch(console.error)
  .finally(() => process.exit(0));
