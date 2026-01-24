"use client";

import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import {
  CarFrontIcon,
  LayoutDashboardIcon,
  MenuIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AdminSearch } from "../admin/search";
import { ThemeToggle } from "../theme-toggle";
import { ActiveLink } from "../ui/active-link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const navigation = [
  {
    name: "Dashboard",
    href: routes.admin.dashboard,
    icon: LayoutDashboardIcon,
  },
  {
    name: "Classifieds",
    href: routes.admin.classifieds,
    icon: CarFrontIcon,
  },
  {
    name: "Customers",
    href: routes.admin.customers,
    icon: UsersIcon,
  },
  {
    name: "Settings",
    href: routes.admin.settings,
    icon: SettingsIcon,
  },
];

export const AdminHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between gap-4 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-20 shadow-sm">
      {/* Left Section: Mobile Menu Trigger & Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Sidebar Trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80vw] sm:w-[350px] p-0">
            <SheetHeader className="h-16 flex items-center justify-center border-b border-gray-100 dark:border-gray-800 px-6">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Link href={routes.home} onClick={() => setOpen(false)}>
                <Image
                  src="/logo.svg"
                  width={140}
                  height={40}
                  className="object-contain h-8 w-auto"
                  alt="Logo"
                />
              </Link>
            </SheetHeader>
            <div className="flex flex-col py-4 px-3 gap-1">
              {navigation.map((item) => (
                <ActiveLink
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium"
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </ActiveLink>
              ))}
            </div>
            {/* Mobile Footer Extras */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Search Bar - Visible on all screens */}
        <div className="w-full max-w-md flex-1">
          <AdminSearch />
        </div>
      </div>

      {/* Right Section: Theme Toggle & Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile Search Icon placeholder if needed, or simplified search */}

        {/* Theme Toggle (Desktop) */}
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>

        {/* User Profile / Avatar could go here */}
      </div>
    </header>
  );
};
