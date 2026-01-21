import { auth } from "@/auth";
import { navLinks } from "@/config/constants";
import { routes } from "@/config/routes";
import { getFavouriteIds } from "@/lib/favourites-db";
import { getSourceId } from "@/lib/source-id";
import { HeartIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { SignOutForm } from "../auth/sign-out-form";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { NavLink } from "../ui/nav-link";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

const CalligraphyLogo = () => (
  <span className="font-serif text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">
    swiftkimani
  </span>
);

export const PublicHeader = async () => {
  const session = await auth();
  const sourceId = await getSourceId();
  const favouriteIds = sourceId ? await getFavouriteIds(sourceId) : [];

  return (
    <header className="fixed top-0 left-0 w-full z-50 box-border">
      <div className="w-full px-2 py-2 md:px-4 md:py-3">
        <nav className="w-full max-w-5xl mx-auto flex items-center justify-between px-3 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-md">
          {/* Logo - Left Section */}
          <Link
            href={routes.home}
            className="flex-shrink-0 min-w-0 truncate max-w-[120px] sm:max-w-none md:flex-1"
          >
            <CalligraphyLogo />
          </Link>

          {/* Desktop Navigation - Centered Section */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.id}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap flex-shrink-0"
                  activeClassName="!bg-blue-100 dark:!bg-blue-900/50 !text-blue-600 dark:!text-blue-400"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Actions - Right Section */}
          <div className="flex items-center gap-1 flex-shrink-0 min-w-0 md:flex-1 md:justify-end">
            <div className="flex items-center gap-1">

              {!session && (
                <Link
                  href={routes.favourites}
                  className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/30 relative flex-shrink-0"
                >
                  <HeartIcon className="w-5 h-5 text-pink-500" />
                  {favouriteIds.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold text-white bg-pink-500 rounded-full flex items-center justify-center">
                      {favouriteIds.length}
                    </span>
                  )}
                </Link>
              )}
              <ThemeToggle />


              {/* Desktop Session Actions */}
              {session && (
                <div className="hidden md:flex items-center gap-1">
                  <NavLink
                    href={routes.admin.dashboard}
                    className="px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap"
                    activeClassName="!bg-blue-100 dark:!bg-blue-900/50 !text-blue-600 dark:!text-blue-400"
                  >
                    Backoffice
                  </NavLink>
                  <SignOutForm />
                </div>
              )}

              {/* Mobile Menu Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden h-9 w-9 rounded-lg flex-shrink-0"
                  >
                    <MenuIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 p-0 bg-white dark:bg-gray-900 overflow-y-auto max-h-screen">
                  <div className="p-4 border-b dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
                    <CalligraphyLogo />
                  </div>
                  <nav className="flex flex-col p-3 gap-1">
                    {!session && (
                      <SheetClose asChild>
                        <NavLink
                          href={routes.favourites}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                          activeClassName="!bg-pink-100 dark:!bg-pink-900/50 !text-pink-600 dark:!text-pink-400"
                        >
                          <HeartIcon className="w-4 h-4 text-pink-500 flex-shrink-0" />
                          <span className="truncate">Favourites</span>
                          {favouriteIds.length > 0 && (
                            <span className="ml-auto text-xs font-bold text-white bg-pink-500 px-1.5 py-0.5 rounded-full flex-shrink-0">
                              {favouriteIds.length}
                            </span>
                          )}
                        </NavLink>
                      </SheetClose>
                    )}

                    <hr className="my-2 dark:border-gray-700" />
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.id}>
                        <NavLink
                          href={link.href}
                          className="px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                          activeClassName="!bg-blue-100 dark:!bg-blue-900/50 !text-blue-600 dark:!text-blue-400"
                        >
                          {link.label}
                        </NavLink>
                      </SheetClose>
                    ))}
                    {session && (
                      <>
                        <SheetClose asChild>
                          <NavLink
                            href={routes.admin.dashboard}
                            className="px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            activeClassName="!bg-blue-100 dark:!bg-blue-900/50 !text-blue-600 dark:!text-blue-400"
                          >
                            Backoffice
                          </NavLink>
                        </SheetClose>
                        <div className="px-3 pt-2">
                          <SignOutForm />
                        </div>
                      </>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};