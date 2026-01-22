import { SignInSchema } from "@/app/schemas/auth.schema";
import { SESSION_MAX_AGE } from "@/config/constants";
import { routes } from "@/config/routes";
import { bcryptPasswordCompare } from "@/lib/bcrypt";
import { issueChallenge } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import type { AdapterUser } from "@auth/core/adapters";
import CredentialsProvider from "@auth/core/providers/credentials";
import ResendProvider from "@auth/core/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig, User } from "next-auth";

export const config = {
	adapter: PrismaAdapter(prisma),
	useSecureCookies: false,
	trustHost: true,
	session: {
		strategy: "database",
		maxAge: SESSION_MAX_AGE / 1000,
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: {
					label: "Email",
					type: "email",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			authorize: async (credentials): Promise<User | null> => {
				try {
					console.log("🔐 authorize called with email:", credentials?.email);
					const validatedFields = SignInSchema.safeParse(credentials);

					if (!validatedFields.success) {
						console.log("❌ Validation failed:", validatedFields.error);
						return null;
					}

					console.log("✅ Validation passed for:", validatedFields.data.email);

					const user = await prisma.user.findUnique({
						where: { email: validatedFields.data.email },
						select: { id: true, email: true, hashedPassword: true },
					});

					if (!user) {
						console.log("❌ User not found in database");
						return null;
					}

					console.log("✅ User found:", user.email);

					const match = await bcryptPasswordCompare(
						validatedFields.data.password,
						user.hashedPassword,
					);

					console.log("🔑 Password match result:", match);

					if (!match) {
						console.log("❌ Password mismatch");
						return null;
					}

					console.log("✅ Password matched, issuing challenge...");
					await issueChallenge(user.id, user.email);

					// Get full user record and cast role
					const dbUser = await prisma.user.findUnique({
						where: { id: user.id },
					});

					// Cast to get role (Prisma types may be stale but DB has role field)
					const userRole = (dbUser as unknown as { role?: string })?.role;
					console.log("✅ Returning user with requires2FA: true, role:", userRole);
					return { ...dbUser, requires2FA: true, role: userRole };
				} catch (error) {
					console.log("❌ Auth error:", error);
					return null;
				}
			},
		}),
		ResendProvider({}),
	],
	pages: {
		signIn: routes.signIn,
		signOut: "/auth/sign-out",
		error: "/auth/error",
	},
	callbacks: {
		async jwt({ user, token }) {
			const session = await prisma.session.create({
				data: {
					expires: new Date(Date.now() + SESSION_MAX_AGE),
					sessionToken: crypto.randomUUID(),
					userId: user.id as string,
					requires2FA: user.requires2FA as boolean,
				},
			});

			if (!session) return null;

			if (user) {
				token.requires2FA = user.requires2FA;
				token.role = user.role;
			}

			token.id = session.sessionToken;
			token.exp = session.expires.getTime();

			return token;
		},

		async session({ session, user, token }) {
			session.user = {
				id: session.userId,
				email: user.email,
			} as AdapterUser;
			session.role = token?.role as typeof user.role;
			return session;
		},
	},
	jwt: {
		encode: async ({ token }) => token?.id as string,
	},
} as NextAuthConfig;