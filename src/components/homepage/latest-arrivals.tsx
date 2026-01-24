import { getFavouriteIds } from "@/lib/favourites-db";
import { prisma } from "@/lib/prisma";
import { getSourceId } from "@/lib/source-id";
import { ClassifiedStatus } from "@prisma/client";
import { LatestArrivalsCarousel } from "./latest-arrivals-carousel";

export const LatestArrivals = async () => {
  const classifieds = await prisma.classified.findMany({
    where: { status: ClassifiedStatus.LIVE },
    take: 6,
    include: { images: true },
  });

  const sourceId = await getSourceId();
  const favouriteIds = sourceId ? await getFavouriteIds(sourceId) : [];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto max-w-[80vw]">
        <h2 className="mt-2 uppercase text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Latest Arrivals
        </h2>
        <LatestArrivalsCarousel
          classifieds={classifieds}
          favourites={favouriteIds}
        />
      </div>
    </section>
  );
};

