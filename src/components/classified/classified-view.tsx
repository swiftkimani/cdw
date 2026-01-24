import { routes } from "@/config/routes";
import { MultiStepFormEnum } from "@/config/types";
import {
  formatBodyType,
  formatColour,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatPrice,
  formatTransmission,
  formatUlezCompliance,
} from "@/lib/utils";
import type { Prisma } from "@prisma/client";
import {
  CarFrontIcon,
  CarIcon,
  CheckIcon,
  Fingerprint,
  FuelIcon,
  GaugeIcon,
  PowerIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HTMLParser } from "../shared/html-parser";
import { Button } from "../ui/button";
import { ClassifiedCarousel } from "./classified-carousel";
import { FinanceCalculator } from "./finance-calculator";
import { WhatsAppButton } from "../shared/whatsapp-button";

type ClassifiedWithImagesAndMake = Prisma.ClassifiedGetPayload<{
  include: { make: true; images: true };
}>;

const features = (props: ClassifiedWithImagesAndMake) => [
  {
    id: 1,
    icon:
      props.ulezCompliance === "EXEMPT" ? (
        <CheckIcon className="w-6 h-6 mx-auto text-green-500" />
      ) : (
        <XIcon className="w-6 h-6 mx-auto text-red-500" />
      ),
    label: formatUlezCompliance(props.ulezCompliance),
  },
  {
    id: 2,
    icon: <Fingerprint className="w-6 h-6 mx-auto text-primary" />,
    label: props.vrm,
  },
  {
    id: 3,
    icon: <CarIcon className="w-6 h-6 mx-auto text-primary" />,
    label: formatBodyType(props.bodyType),
  },
  {
    id: 4,
    icon: <FuelIcon className="w-6 h-6 mx-auto text-primary" />,
    label: formatFuelType(props.fuelType),
  },
  {
    id: 5,
    icon: <PowerIcon className="w-6 h-6 mx-auto text-primary" />,
    label: formatTransmission(props.transmission),
  },
  {
    id: 6,
    icon: <GaugeIcon className="w-6 h-6 mx-auto text-primary" />,
    label: `${formatNumber(props.odoReading)} ${formatOdometerUnit(
      props.odoUnit
    )}`,
  },
  {
    id: 7,
    icon: <UsersIcon className="w-6 h-6 mx-auto text-primary" />,
    label: props.seats,
  },
  {
    id: 8,
    icon: <CarFrontIcon className="w-6 h-6 mx-auto text-primary" />,
    label: props.doors,
  },
];

export const ClassifiedView = (props: ClassifiedWithImagesAndMake) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Image Carousel Section */}
          <div className="lg:w-1/2">
            <div className="sticky top-24 rounded-2xl overflow-hidden shadow-xl dark:shadow-gray-900/50">
              <ClassifiedCarousel images={props.images} />
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 space-y-6">
            {/* Header with Make Logo and Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:shadow-gray-900/30">
              <div className="flex-shrink-0 bg-white dark:bg-gray-700 rounded-xl p-3 shadow-md">
                <Image
                  src={props.make.image}
                  alt={props.make.name}
                  className="w-16 h-16 object-contain"
                  width={64}
                  height={64}
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  {props.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{props.make.name}</p>
              </div>
            </div>

            {/* Quick Info Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full">
                {props.year}
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2 rounded-full">
                {formatNumber(props.odoReading)} {formatOdometerUnit(props.odoUnit)}
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2 rounded-full">
                {formatColour(props.colour)}
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2 rounded-full">
                {formatFuelType(props.fuelType)}
              </span>
            </div>

            {/* Description */}
            {props.description && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:shadow-gray-900/30">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                <div className="text-gray-600 dark:text-gray-300 prose dark:prose-invert prose-sm max-w-none">
                  <HTMLParser html={props.description} />
                </div>
              </div>
            )}

            {/* Price Card */}
            <div className="bg-gradient-to-br from-primary to-primary/80 p-8 rounded-2xl shadow-xl text-center">
              <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                Our Price
              </p>
              <p className="text-4xl md:text-5xl font-bold text-white">
                {formatPrice({ price: props.price, currency: props.currency })}
              </p>
            </div>

            {/* Reserve & WhatsApp Actions */}
            <div className="flex flex-col gap-3">
              <Button
                className="w-full py-6 text-lg font-bold uppercase tracking-wide rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                size="lg"
                asChild>
                <Link href={routes.reserve(props.slug, MultiStepFormEnum.WELCOME)}>
                  Reserve Now
                </Link>
              </Button>
              <WhatsAppButton
                message={`Hi, I'm interested in the ${props.year} ${props.make.name} ${props.title} (${formatPrice({ price: props.price, currency: props.currency })})`}
                fullWidth
                variant="outline"
                className="py-6 text-lg"
              />
            </div>

            {/* Finance Calculator */}
            <FinanceCalculator price={props.price} />

            {/* Feature Grid */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:shadow-gray-900/30">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {features(props).map(({ id, icon, label }) => (
                  <div
                    key={id}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center flex flex-col items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group">
                    <div className="group-hover:scale-110 transition-transform duration-200">
                      {icon}
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

