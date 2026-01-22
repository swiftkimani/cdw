"use server";

import { auth } from "@/../auth";
import { prisma } from "@/lib/prisma";
import { canManageUsers, type Role } from "@/lib/permissions";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, newRole: Role) {
  try {
    const session = await auth();

    // Only super admins can change roles
    if (!session || !canManageUsers(session.role)) {
      return { success: false, message: "Unauthorized" };
    }

    // Don't allow changing own role
    if (session.user?.id === userId) {
      return { success: false, message: "Cannot change your own role" };
    }

    // Use $executeRaw to bypass Prisma typed client issues with role field
    await prisma.$executeRaw`UPDATE users SET role = ${newRole}::\"Role\" WHERE id = ${userId}`;

    revalidatePath("/admin/users");

    return { success: true, message: "Role updated successfully" };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return { success: false, message: "Failed to update role" };
  }
}
