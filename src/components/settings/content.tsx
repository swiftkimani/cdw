"use client";

import { logoutOfAllSessions } from "@/app/_actions/sign-out";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { TotpSettings } from "../auth/totp-settings";

const LogoutButton = () => {
  const { pending } = useFormStatus();

  return (
    <div className="mt-8 flex">
      <Button
        disabled={pending}
        className="flex items-center gap-x-2"
        variant="destructive"
        type="submit">
        {pending && <Loader2 className="animate-spin w-4 h-4" />}
        {pending ? "Logging out..." : "Log out of all sessions"}
      </Button>
    </div>
  );
};

export const SettingsPageContent = () => {
  const [_, formAction] = useActionState(logoutOfAllSessions, null);

  return (
    <div className="divide-y divide-white/5 px-6 space-y-8">
      {/* Two-Factor Authentication Section */}
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 md:grid-cols-3 pt-6">
        <div>
          <h2 className="text-base font-semibold leading-7 text-muted">
            Two-Factor Authentication
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted/75">
            Secure your account with Google Authenticator. When enabled, you&apos;ll
            use your authenticator app instead of email codes for login verification.
          </p>
        </div>
        <div className="md:col-span-2">
          <TotpSettings />
        </div>
      </div>

      {/* Logout Section */}
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 md:grid-cols-3 pt-6">
        <div>
          <h2 className="text-base font-semibold leading-7 text-muted">
            Log out of all sessions
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted/75">
            This will log out out of all of your sessions across all of your
            devices of which you are currently logged into.
          </p>
        </div>
        <form action={formAction} className="md:col-span-2">
          <LogoutButton />
        </form>
      </div>
    </div>
  );
};