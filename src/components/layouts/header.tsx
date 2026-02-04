import { auth } from "@/auth";
import { navLinks } from "@/config/constants";
import { routes } from "@/config/routes";
import { getFavouriteIds } from "@/lib/favourites-db";
import { getSourceId } from "@/lib/source-id";
import { HeartIcon, MenuIcon, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SignOutForm } from "../auth/sign-out-form";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { NavLink } from "../ui/nav-link";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

const CalligraphyLogo = () => (
  <div className="flex items-center gap-2">
    <Image
      src="/logo.png"
      alt="Leroki Motors Logo"
      width={180}
      height={80}
      className="object-contain h-10 md:h-12 w-auto"
      priority
    />
  </div>
);

export const PublicHeader = async () => {
  const session = await auth();
  const sourceId = await getSourceId();
  const favouriteIds = sourceId ? await getFavouriteIds(sourceId) : [];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between p-2 pl-6 pr-2 gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] max-w-5xl w-full">

        {/* Logo */}
        <Link href={routes.home} className="flex-shrink-0">
          <CalligraphyLogo />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              href={link.href}
              className="px-4 py-2 text-sm font-medium rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
              activeClassName="!bg-blue-500 !text-white !font-semibold shadow-md shadow-blue-500/30"
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!session && (
            <Link
              href={routes.favourites}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-pink-50 dark:hover:bg-pink-900/30 text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-all duration-200 group"
            >
              <HeartIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {favouriteIds.length > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-pink-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse" />
              )}
            </Link>
          )}

          <ThemeToggle />

          {session ? (
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
              <NavLink
                href={routes.admin.dashboard}
                className="px-4 py-2 text-sm font-medium rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
                activeClassName="opacity-100"
              >
                Dashboard
              </NavLink>
              <SignOutForm />
            </div>
          ) : (
            <Link href={routes.signIn} className="hidden md:block ml-2">
              <Button size="sm" className="rounded-full px-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 shadow-lg shadow-gray-900/20">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <MenuIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-6">
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <CalligraphyLogo />
                </div>

                <nav className="flex flex-col gap-2 space-y-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.id}>
                      <NavLink
                        href={link.href}
                        className="px-4 py-3 text-base font-medium rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        activeClassName="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      >
                        {link.label}
                      </NavLink>
                    </SheetClose>
                  ))}

                  {!session && (
                    <SheetClose asChild>
                      <NavLink
                        href={routes.favourites}
                        className="px-4 py-3 text-base font-medium rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between"
                        activeClassName="bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400"
                      >
                        <div className="flex items-center gap-3">
                          <HeartIcon className="w-5 h-5" />
                          Favourites
                        </div>
                        {favouriteIds.length > 0 && (
                          <span className="px-2 py-0.5 text-xs font-bold text-white bg-pink-500 rounded-full">
                            {favouriteIds.length}
                          </span>
                        )}
                      </NavLink>
                    </SheetClose>
                  )}
                </nav>

                <div className="mt-auto space-y-4 pt-8 border-t border-gray-100 dark:border-gray-800">
                  {session ? (
                    <>
                      <SheetClose asChild>
                        <Link href={routes.admin.dashboard}>
                          <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-6">
                            Dashboard
                          </Button>
                        </Link>
                      </SheetClose>
                      <div className="flex justify-center">
                        <SignOutForm />
                      </div>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Link href={routes.signIn}>
                        <Button className="w-full rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 py-6 font-medium text-lg">
                          Sign In
                        </Button>
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};