"use client";

import type { ClassifiedWithImages } from "@/config/types";
import dynamic from "next/dynamic";
import "swiper/css";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { ClassifiedCard } from "../inventory/classified-card";
import { ClassifiedCardSkeleton } from "../inventory/classified-card-skeleton";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  classifieds: ClassifiedWithImages[];
  favourites: number[];
}

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <ClassifiedCardSkeleton key={i} />
      ))}
    </div>
  ),
});

export const LatestArrivalsCarousel = (props: CarouselProps) => {
  const { classifieds, favourites } = props;

  return (
    <div className="mt-8 relative group">
      <Swiper
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        modules={[Navigation, Autoplay]}
        loop={true}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1536: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="!overflow-visible"
      >
        {classifieds.map((classified, index) => {
          return (
            <SwiperSlide key={classified.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <ClassifiedCard classified={classified} favourites={favourites} />
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <motion.button
        className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-14 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
        whileHover={{ scale: 1.1, x: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
      </motion.button>

      <motion.button
        className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-14 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
      </motion.button>
    </div>
  );
};
