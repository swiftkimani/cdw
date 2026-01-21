import { auth } from "@/auth";
import { navLinks } from "@/config/constants";
import { routes } from "@/config/routes";
import { getFavouriteIds } from "@/lib/favourites-db";
import { getSourceId } from "@/lib/source-id";
import { HeartIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { SignOutForm } from "../auth/sign-out-form";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

// Calligraphy Logo Component
const CalligraphyLogo = () => (
  <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm italic select-none whitespace-nowrap">
    swiftkimani
  </span>
);

export const PublicHeader = async () => {
  const session = await auth();
  const sourceId = await getSourceId();
  const favouriteIds = sourceId ? await getFavouriteIds(sourceId) : [];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 py-2 md:px-8 md:py-3 overflow-x-hidden">
      {/* Glassmorphism Container */}
      <div className="mx-auto max-w-7xl w-full">
        <nav className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/30 shadow-lg shadow-black/5 dark:shadow-black/20 gap-2">
          {/* Logo */}
          <Link 
            href={routes.home} 
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105 shrink-0"
          >
            <CalligraphyLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/80 dark:hover:bg-blue-900/30 group"
                href={link.href}
                key={link.id}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Theme Toggle - Always visible */}
            <ThemeToggle />

            {session ? (
              <div className="hidden md:flex items-center gap-4">
                <Link 
                  href={routes.admin.dashboard} 
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/80 dark:hover:bg-blue-900/30"
                >
                  Backoffice
                </Link>
                <SignOutForm />
              </div>
            ) : (
              <Link 
                href={routes.favourites}
                className="relative p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-pink-50/80 dark:hover:bg-pink-900/30 group hidden sm:flex"
              >
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/50 dark:to-rose-900/50 group-hover:from-pink-200 group-hover:to-rose-200 dark:group-hover:from-pink-800/50 dark:group-hover:to-rose-800/50 transition-all duration-300">
                  <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 group-hover:text-pink-600 dark:text-pink-400 transition-colors" />
                </div>
                {favouriteIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 sm:min-w-5 sm:h-5 px-1 sm:px-1.5 text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg">
                    {favouriteIds.length}
                  </span>
                )}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300 h-9 w-9"
                >
                  <MenuIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                  <SheetTitle className="sr-only">Toggle navigation menu</SheetTitle>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[280px] sm:w-full sm:max-w-sm p-0 backdrop-blur-2xl bg-white/95 dark:bg-gray-900/95 border-l border-white/30 dark:border-gray-700/30"
              >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800">
                  <CalligraphyLogo />
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80">
                      <XIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </Button>
                  </SheetClose>
                </div>
                
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col p-4 sm:p-6 gap-2">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.id}>
                      <Link
                        className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  
                  {/* Mobile Session Links */}
                  {session ? (
                    <>
                      <div className="h-px bg-gray-200 dark:bg-gray-700 my-4" />
                      <SheetClose asChild>
                        <Link
                          href={routes.admin.dashboard}
                          className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Backoffice
                        </Link>
                      </SheetClose>
                      <div className="px-4 pt-2">
                        <SignOutForm />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-px bg-gray-200 dark:bg-gray-700 my-4" />
                      <SheetClose asChild>
                        <Link
                          href={routes.favourites}
                          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 dark:hover:from-pink-900/30 dark:hover:to-rose-900/30 hover:text-pink-600 dark:hover:text-pink-400"
                        >
                          <HeartIcon className="w-5 h-5" />
                          Favourites
                          {favouriteIds.length > 0 && (
                            <span className="ml-auto flex items-center justify-center min-w-6 h-6 px-2 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
                              {favouriteIds.length}
                            </span>
                          )}
                        </Link>
                      </SheetClose>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

