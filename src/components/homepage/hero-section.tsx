import { prisma } from "@/lib/prisma";
import { buildClassifiedFilterQuery } from "@/lib/utils";
import { ClassifiedStatus } from "@prisma/client";
import type { AwaitedPageProps } from "@/config/types";
import { HeroSectionClient } from "./hero-section-client";

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
    <HeroSectionClient
      searchParams={searchParams}
      classifiedsCount={classifiedsCount}
      totalFiltersApplied={totalFiltersApplied}
      isFilterApplied={isFilterApplied}
      minMaxValues={minMaxResult}
    />
  );
};
