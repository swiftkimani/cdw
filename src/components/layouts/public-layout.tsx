import type { PropsWithChildren } from "react";
import { PublicFooter } from "./footer";
import { PublicHeader } from "./header";

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <PublicHeader />
      <main className="flex-1 bg-white dark:bg-gray-900 pt-20 w-full">
        <div className="w-full">
          {children}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}