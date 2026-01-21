import { imageSources } from "@/config/constants";
import { routes } from "@/config/routes";
import type { AwaitedPageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { buildClassifiedFilterQuery } from "@/lib/utils";
import { ClassifiedStatus } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import { HomepageTaxonomyFilters } from "./homepage-filters";
import { SearchButton } from "./search-button";

export const HeroSection = async (props: AwaitedPageProps) => {
  const { searchParams } = props;
  const totalFiltersApplied = Object.keys(searchParams || {}).length;
  const isFilterApplied = totalFiltersApplied > 0;

  const classifiedsCount = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  });

  const minMaxResult = await prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: {
      year: true,
      price: true,
      odoReading: true,
    },
    _max: {
      price: true,
      year: true,
      odoReading: true,
    },
  });

  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center px-4 sm:px-6 -mt-20"
      style={{
        backgroundImage: `url(${imageSources.carLinup})`,
      }}>
      <div className="absolute inset-0 bg-black/75" />
      <div className="container relative z-10 py-24 lg:py-28">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center space-y-8 lg:space-y-0">
          {/* Hero Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase font-extrabold text-white leading-tight">
              Unbeatable Deals on New & Used Cars
            </h1>
            <h2 className="mt-4 uppercase text-sm sm:text-base md:text-xl lg:text-2xl text-white/90">
              Discover your dream car today
            </h2>
          </div>
          
          {/* Search Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Find Your Perfect Car
              </h3>
              <div className="space-y-3">
                <HomepageTaxonomyFilters
                  minMaxValues={minMaxResult}
                  searchParams={searchParams}
                />
                <div className="pt-2">
                  <SearchButton count={classifiedsCount} />
                </div>
                {isFilterApplied && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <Link href={routes.home}>
                      Clear Filters ({totalFiltersApplied})
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

