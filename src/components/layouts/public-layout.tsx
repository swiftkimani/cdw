import type { PropsWithChildren } from "react";
import { PublicFooter } from "./footer";
import { PublicHeader } from "./header";

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PublicHeader />
      <main className="bg-white pt-20">{children}</main>
      <PublicFooter />
    </>
  );
}
