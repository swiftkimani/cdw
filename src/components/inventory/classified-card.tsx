"use client";

import { routes } from "@/config/routes";
import { type ClassifiedWithImages, MultiStepFormEnum } from "@/config/types";
import {
  formatColour,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatPrice,
  formatTransmission,
} from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Cog, Fuel, GaugeCircle, ImageOff, Paintbrush2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HTMLParser } from "../shared/html-parser";
import { Button } from "../ui/button";
import { ImgixImage } from "../ui/imgix-image";
import { FavouriteButton } from "./favourite-button";

interface ClassifiedCardProps {
  classified: ClassifiedWithImages;
  favourites: number[];
}

const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
  return [
    {
      id: "odoReading",
      icon: <GaugeCircle className="w-4 h-4" />,
      value: `${formatNumber(classified.odoReading)} ${formatOdometerUnit(
        classified.odoUnit
      )}`,
    },
    {
      id: "transmission",
      icon: <Cog className="w-4 h-4" />,
      value: classified?.transmission
        ? formatTransmission(classified?.transmission)
        : null,
    },
    {
      id: "fuelType",
      icon: <Fuel className="w-4 h-4" />,
      value: classified?.fuelType ? formatFuelType(classified.fuelType) : null,
    },
    {
      id: "colour",
      icon: <Paintbrush2 className="w-4 h-4" />,
      value: classified?.colour ? formatColour(classified.colour) : null,
    },
  ];
};

export const ClassifiedCard = (props: ClassifiedCardProps) => {
  const { classified, favourites } = props;

  const pathname = usePathname();
  const [isFavourite, setIsFavourite] = useState(
    favourites.includes(classified.id)
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isFavourite && pathname === routes.favourites) setIsVisible(false);
  }, [isFavourite, pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="bg-white dark:bg-gray-800 relative rounded-xl shadow-lg dark:shadow-gray-900/40 overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-900/60 transition-shadow duration-300 cursor-pointer">
          <div className="aspect-3/2 relative bg-gray-100 dark:bg-gray-700">
            <Link href={routes.singleClassified(classified.slug)}>
              {classified.images[0]?.src ? (
                <ImgixImage
                  placeholder="blur"
                  blurDataURL={classified.images[0]?.blurhash || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="}
                  src={classified.images[0].src}
                  alt={classified.images[0]?.alt ?? classified.title}
                  className="object-cover rounded-t-md"
                  fill={true}
                  quality={25}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageOff className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
              )}
            </Link>
            <FavouriteButton
              setIsFavourite={setIsFavourite}
              isFavourite={isFavourite}
              id={classified.id}
            />
            <div className="absolute top-2.5 right-3.5 bg-primary text-slate-50 font-bold px-2 py-1 rounded">
              <p className="text-xs lg:text-base xl:text-lg font-semibold">
                {formatPrice({
                  price: classified.price,
                  currency: classified.currency,
                })}
              </p>
            </div>
          </div>
          <div className="p-5 flex flex-col space-y-4">
            <div>
              <Link
                href={routes.singleClassified(classified.slug)}
                className="text-sm md:text-base lg:text-lg font-semibold line-clamp-1 transition-colors hover:text-primary text-gray-900 dark:text-white">
                {classified.title}
              </Link>
              {classified?.description && (
                <div className="text-xs md:text-sm xl:text-base text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                  <HTMLParser html={classified.description} />
                  &nbsp;{" "}
                  {/* Used for equal spacing across each card in the grid */}
                </div>
              )}

              <ul className="text-xs md:text-sm text-gray-600 dark:text-gray-300 xl:flex grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-4 items-center justify-between w-full mt-3">
                {getKeyClassifiedInfo(classified)
                  .filter((v) => v.value)
                  .map(({ id, icon, value }) => (
                    <li
                      key={id}
                      className="font-semibold flex xl:flex-col items-center gap-x-1.5 py-1">
                      {icon} {value}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:gap-x-3 w-full">
              <Button
                className="flex-1 transition-all py-2.5 lg:py-3 h-full text-xs md:text-sm xl:text-base border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white hover:border-primary dark:hover:bg-primary dark:hover:border-primary"
                asChild
                variant="outline"
                size="sm">
                <Link
                  href={routes.reserve(
                    classified.slug,
                    MultiStepFormEnum.WELCOME
                  )}>
                  Reserve
                </Link>
              </Button>
              <Button
                className="flex-1 py-2.5 lg:py-3 h-full text-xs md:text-sm xl:text-base bg-primary hover:bg-primary/90 text-white"
                asChild
                size="sm">
                <Link href={routes.singleClassified(classified.slug)}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
