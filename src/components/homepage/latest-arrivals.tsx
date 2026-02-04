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
    <section className="relative py-20 sm:py-28 bg-white dark:bg-black overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      <div className="container relative z-10 mx-auto max-w-[85vw]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 rounded-full uppercase tracking-wider">
              New Arrivals
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Latest Arrivals
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-lg">
              Discover our newest additions, handpicked for excellence.
            </p>
          </div>

          <Link
            href={routes.inventory}
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            View All
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
