"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}
export const ActiveLink = (props: ActiveLinkProps) => {
  const { href, children, className } = props;
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={cn(
        className,
        isActive
          ? "bg-primary text-primary-foreground hover:bg-primary"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      )}>
      {children}
    </Link>
  );
};