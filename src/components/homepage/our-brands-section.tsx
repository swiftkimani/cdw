import { routes } from "@/config/routes";
import { prisma } from "@/lib/prisma";
import { ClassifiedStatus } from "@prisma/client";
import { OurBrandsSectionClient } from "./our-brands-section-client";

export const OurBrandsSection = async () => {
  const brands = await prisma.make.findMany({
    where: {
      name: {
        in: [
          "Rolls-Royce",
          "Aston Martin",
          "Porsche",
          "Lamborghini",
          "Audi",
          "Jaguar",
          "Land Rover",
          "Mercedes-Benz",
          "Ferrari",
          "Bentley",
          "McLaren",
          "Ford",
          "Volkswagen",
          "Maserati",
          "Lexus",
          "BMW",
          "Tesla",
          "Range Rover",
        ],
        mode: "insensitive",
      },
    },
  });

  const count = await prisma.classified.count({
    where: { status: ClassifiedStatus.LIVE },
  });

  return <OurBrandsSectionClient brands={brands} count={count} />;
};
