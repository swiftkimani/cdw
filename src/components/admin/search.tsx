"use client";
import { usePathname } from "next/navigation";
import { SearchInput } from "../shared/search-input";

export const AdminSearch = () => {
  const pathname = usePathname();
  return (
    <SearchInput
      placeholder={`Search ${pathname?.split("/")[2] || "content"}...`}
      className="w-full focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-gray-500 text-gray-900 dark:text-gray-100 appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-8 rounded-md shadow-sm"
    />
  );
};
