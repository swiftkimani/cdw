import { getFavouriteIds } from "@/lib/favourites-db";
import { prisma } from "@/lib/prisma";
import { getSourceId } from "@/lib/source-id";
import { ClassifiedStatus } from "@prisma/client";
import { LatestArrivalsCarousel } from "./latest-arrivals-carousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";

export const LatestArrivals = async () => {
  const classifieds = await prisma.classified.findMany({
    where: { status: ClassifiedStatus.LIVE },
    take: 8,
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });

  const sourceId = await getSourceId();
  const favouriteIds = sourceId ? await getFavouriteIds(sourceId) : [];

  return (
    <section className="relative py-20 sm:py-28 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-[85vw]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full uppercase tracking-wider">
              New Arrivals
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Latest <span className="text-gradient">Arrivals</span>
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-lg">
              Discover our newest additions to the collection, handpicked for excellence.
            </p>
          </div>

          <Link
            href={routes.inventory}
            className="group inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View All Vehicles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel */}
        <LatestArrivalsCarousel
          classifieds={classifieds}
          favourites={favouriteIds}
        />
      </div>
    </section>
  );
};
