import { AdminHeader } from "@/components/layouts/admin-header";
import { AdminSidebar } from "@/components/layouts/admin-sidebar";
import { routes } from "@/config/routes";
import { canAccessAdmin } from "@/lib/permissions";
import { auth } from "@/../auth";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function AdminLayout({ children }: PropsWithChildren) {
  // Server-side auth check - redirect unauthenticated users to sign-in
  const session = await auth();

  if (!session) {
    redirect(routes.signIn);
  }

  // Optional: Check if user needs 2FA verification
  if (session.requires2FA) {
    redirect(routes.challenge);
  }

  // Role-based access control - require EDITOR or higher
  if (!canAccessAdmin(session.role)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You don&apos;t have permission to access the admin panel.
          </p>
          <a
            href="/"
            className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-primary-900 min-h-screen w-full">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        <main className="admin-scrollbar flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}