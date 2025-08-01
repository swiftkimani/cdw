import type { BadgeProps } from "@/components/ui/badge";
import { ClassifiedStatus, CustomerStatus } from "@prisma/client";
import { routes } from "./routes";

export const imageSources = {
  classifiedPlaceholder:
    "https://swiftkimani-motors.s3.eu-north-1.amazonaws.com/uploads/AdobeStock_197763326.jpeg",
  carLinup:
    "https://swiftkimani-motors.s3.eu-north-1.amazonaws.com/uploads/AdobeStock_197763326.jpeg",
  featureSection:
    "https://majestic-motors.s3.eu-west-2.amazonaws.com/uploads/feature-section.jpg",
};
export const CLASSIFIEDS_PER_PAGE = 3;

export const navLinks = [
  { id: 1, href: routes.home, label: "Home" },
  { id: 2, href: routes.inventory, label: "Inventory" },
];

export const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in seconds
export const MAX_IMAGE_SIZE = 20 * 1000 * 1000; // 2mb
export const MAX_IMAGES = 20;
export const sortOrder = ["asc", "desc"] as const;

export const ClassifiedBadgeMap: Record<
  ClassifiedStatus,
  BadgeProps["variant"]
> = {
  [ClassifiedStatus.DRAFT]: "secondary",
  [ClassifiedStatus.LIVE]: "default",
  [ClassifiedStatus.SOLD]: "destructive",
};

export const CustomerBadgeMap: Record<CustomerStatus, BadgeProps["variant"]> = {
  [CustomerStatus.COLD]: "secondary",
  [CustomerStatus.CONTACTED]: "default",
  [CustomerStatus.INTERESTED]: "destructive",
  [CustomerStatus.PURCHASED]: "warning",
  [CustomerStatus.SUBSCRIBER]: "info",
};
