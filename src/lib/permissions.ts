// Define Role type locally to avoid Prisma import issues at runtime
export type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "USER";

/**
 * Role hierarchy - higher number = more permissions
 */
export const ROLE_HIERARCHY: Record<Role, number> = {
  USER: 0,
  EDITOR: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
};

/**
 * Check if a user has at least the required role level
 */
export function hasRole(userRole: Role | undefined, requiredRole: Role): boolean {
  if (!userRole) return false;
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Check if user can access admin panel (EDITOR or higher)
 */
export function canAccessAdmin(role: Role | undefined): boolean {
  return hasRole(role, "EDITOR");
}

/**
 * Check if user can manage content (EDITOR or higher)
 */
export function canManageContent(role: Role | undefined): boolean {
  return hasRole(role, "EDITOR");
}

/**
 * Check if user can manage users (SUPER_ADMIN only)
 */
export function canManageUsers(role: Role | undefined): boolean {
  return hasRole(role, "SUPER_ADMIN");
}

/**
 * Check if user can change roles (SUPER_ADMIN only)
 */
export function canChangeRoles(role: Role | undefined): boolean {
  return hasRole(role, "SUPER_ADMIN");
}

/**
 * Check if user is admin (ADMIN or higher)
 */
export function isAdmin(role: Role | undefined): boolean {
  return hasRole(role, "ADMIN");
}

/**
 * Get human-readable role name
 */
export function formatRole(role: Role): string {
  switch (role) {
    case "SUPER_ADMIN":
      return "Super Admin";
    case "ADMIN":
      return "Admin";
    case "EDITOR":
      return "Editor";
    case "USER":
      return "User";
    default:
      return "Unknown";
  }
}

/**
 * Get available roles for assignment (super admin can assign any, admin can assign lower)
 */
export function getAssignableRoles(currentUserRole: Role): Role[] {
  if (currentUserRole === "SUPER_ADMIN") {
    return ["USER", "EDITOR", "ADMIN", "SUPER_ADMIN"];
  }
  return [];
}

