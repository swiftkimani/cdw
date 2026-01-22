import type { Role } from "@prisma/client";
import type NextAuth from "next-auth";

declare module "next-auth" {
	interface User extends NextAuth.User {
		requires2FA?: boolean | undefined;
		role?: Role;
	}

	interface Session extends NextAuth.Session {
		requires2FA?: boolean;
		role?: Role;
	}
}