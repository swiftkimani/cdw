"use client";

import { motion } from "framer-motion";
import { imageSources } from "@/config/constants";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { Trophy, Wallet, RefreshCw, Car, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Premium Selection",
    description: "Handpicked luxury vehicles from world-renowned brands, each inspected for excellence.",
  },
  {
    icon: Wallet,
    title: "Flexible Financing",
    description: "Competitive rates and customized payment plans tailored to your budget.",
  },
  {
    icon: RefreshCw,
    title: "Trade-In Available",
    description: "Get the best value for your current vehicle with our hassle-free trade-in program.",
  },
  {
    icon: Shield,
    title: "Extended Warranty",
    description: "Comprehensive coverage plans that give you peace of mind on the road.",
  },
  {
    icon: Car,
    title: "Same Day Delivery",
    description: "Drive away in your dream car the same day with our express delivery service.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service to assist you whenever you need help.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Subtle Gradient Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 dark:bg-white/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="inline-block px-4 py-2 mb-4 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            Why Choose Us
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Leroki Motors
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Our exclusive collection offers unmatched luxury and speed for the ultimate driving experience.
          </p>
        </ScrollReveal>

        {/* Features Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.1}>
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="group relative p-6 lg:p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 card-hover-lift"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                {/* Subtle Hover Border Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />

                {/* Icon - Monochromatic */}
                <div className="w-14 h-14 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center mb-5 shadow-md">
                  <feature.icon className="w-7 h-7 text-white dark:text-gray-900" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Feature Image Banner */}
        <ScrollReveal className="mt-16 lg:mt-24" delay={0.2}>
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {/* Monochrome Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-black/90 z-10" />

            {/* Background Image */}
            <div
              className="h-[300px] lg:h-[400px] bg-cover bg-center"
              style={{
                backgroundImage: `url(${imageSources.featureSection})`,
              }}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
              <motion.h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Experience Luxury on Your Terms
              </motion.h3>
              <motion.p
                className="text-lg text-white/80 max-w-2xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                From sports cars to SUVs, find the perfect vehicle that matches your lifestyle.
              </motion.p>
              <motion.button
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Collection
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
