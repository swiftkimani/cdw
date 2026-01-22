"use client";

import { type Role, formatRole } from "@/lib/permissions";
import { useState } from "react";
import { updateUserRole } from "@/app/_actions/update-user-role";

interface UserRoleSelectProps {
    userId: string;
    currentRole: Role;
    userEmail: string;
    currentUserEmail: string;
}

export function UserRoleSelect({
    userId,
    currentRole,
    userEmail,
    currentUserEmail,
}: UserRoleSelectProps) {
    const [role, setRole] = useState<Role>(currentRole);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Prevent users from changing their own role
    const isSelf = userEmail === currentUserEmail;

    const handleRoleChange = async (newRole: Role) => {
        if (isSelf) return;

        setIsUpdating(true);
        setError(null);

        try {
            const result = await updateUserRole(userId, newRole);
            if (result.success) {
                setRole(newRole);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Failed to update role");
        } finally {
            setIsUpdating(false);
        }
    };

    const roles: Role[] = ["USER", "EDITOR", "ADMIN", "SUPER_ADMIN"];

    return (
        <div className="flex items-center gap-2">
            <select
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as Role)}
                disabled={isUpdating || isSelf}
                className={`block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary text-sm ${isSelf ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {roles.map((r) => (
                    <option key={r} value={r}>
                        {formatRole(r)}
                    </option>
                ))}
            </select>
            {isUpdating && (
                <span className="text-xs text-gray-500">Saving...</span>
            )}
            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
            {isSelf && (
                <span className="text-xs text-gray-400">(You)</span>
            )}
        </div>
    );
}
