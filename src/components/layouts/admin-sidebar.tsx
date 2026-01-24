"use client";

import { routes } from "@/config/routes";
import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import {
  CarFrontIcon,
  ChevronLeft,
  ChevronRight,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ActiveLink } from "../ui/active-link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

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

export const AdminSidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const sidebarVariants: Variants = {
    expanded: { width: 256 },
    collapsed: { width: 70 },
  };

  const menuTextVariants: Variants = {
    expanded: {
      opacity: 1,
      width: "auto",
      display: "block",
      transition: {
        opacity: { delay: 0.1 },
      }
    },
    collapsed: {
      opacity: 0,
      width: 0,
      display: "none"
    },
  };

  const logoVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      className="hidden md:flex bg-white dark:bg-gray-900 h-screen border-r border-gray-200 dark:border-gray-800 flex-col transition-all relative z-10"
      animate={isSidebarExpanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      initial="expanded"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Branding Section */}
      <div className="h-[70px] flex items-center justify-center border-b border-gray-100 dark:border-gray-800 px-4">
        <Link href={routes.home} className="relative block h-10 w-full">
          <AnimatePresence mode="wait">
            {isSidebarExpanded ? (
              <motion.div
                key="expanded-logo"
                className="absolute inset-0 flex items-center"
                variants={logoVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Image
                  src="/logo.svg"
                  width={150}
                  height={40}
                  className="object-contain object-left h-8 w-auto"
                  alt="Logo"
                />
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-logo"
                className="absolute inset-0 flex items-center justify-center"
                variants={logoVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Image
                  src="/logo-mob.svg"
                  width={40}
                  height={40}
                  className="object-contain h-8 w-auto"
                  alt="Logo"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {navigation.map((item) => (
          <ActiveLink
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group overflow-hidden whitespace-nowrap",
              !isSidebarExpanded && "justify-center px-2"
            )}
          >
            <item.icon className={cn("h-5 w-5 shrink-0 transition-colors")} />
            <motion.span
              variants={menuTextVariants}
              className="font-medium text-sm"
            >
              {item.name}
            </motion.span>
          </ActiveLink>
        ))}
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2 bg-white dark:bg-gray-900">



        {/* Sidebar Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          className="w-full mt-2 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          {isSidebarExpanded ? (
            <div className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs uppercase font-semibold tracking-wider">Collapse</span>
            </div>
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
    </motion.div>
  );
};
