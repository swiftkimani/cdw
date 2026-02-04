"use client";

import { imageSources } from "@/config/constants";
import { routes } from "@/config/routes";
import type { AwaitedPageProps } from "@/config/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { HomepageTaxonomyFilters } from "./homepage-filters";
import { SearchButton } from "./search-button";
import { FloatingElements } from "./floating-elements";
import { AnimatedCounter } from "./animated-counter";
import { ArrowRight, Sparkles, Shield, Award } from "lucide-react";

interface HeroSectionClientProps {
    searchParams: AwaitedPageProps["searchParams"];
    classifiedsCount: number;
    totalFiltersApplied: number;
    isFilterApplied: boolean;
    minMaxValues: {
        _min: { year: number | null; price: number | null; odoReading: number | null };
        _max: { year: number | null; price: number | null; odoReading: number | null };
    };
}

export const HeroSectionClient = ({
    searchParams,
    classifiedsCount,
    totalFiltersApplied,
    isFilterApplied,
    minMaxValues,
}: HeroSectionClientProps) => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
    };

    const stats = [
        { value: 500, suffix: "+", label: "Premium Vehicles" },
        { value: 15, suffix: "+", label: "Luxury Brands" },
        { value: 98, suffix: "%", label: "Happy Customers" },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20">
            {/* Background Image with Parallax Effect */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                style={{
                    backgroundImage: `url(${imageSources.carLinup})`,
                }}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

            {/* Animated Mesh Gradient */}
            <div className="absolute inset-0 gradient-mesh opacity-60" />

            {/* Floating Elements */}
            <FloatingElements />

            {/* Content Container */}
            <div className="container relative z-10 py-24 lg:py-32 px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Hero Text Content */}
                    <motion.div
                        className="text-center lg:text-left space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Badge */}
                        <motion.div variants={itemVariants}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-white/90">
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                Premium Car Dealership
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
                        >
                            <span className="block">Find Your</span>
                            <span className="block text-gradient">Dream Car</span>
                            <span className="block">Today</span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            variants={itemVariants}
                            className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto lg:mx-0"
                        >
                            Discover an exclusive collection of premium vehicles.
                            Unbeatable deals on new and pre-owned luxury cars.
                        </motion.p>

                        {/* CTA Buttons - Mobile Only */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:hidden"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="group gradient-primary text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
                            >
                                <Link href={routes.inventory}>
                                    Browse Inventory
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Stats Section */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center lg:text-left">
                                    <div className="text-2xl sm:text-3xl font-bold text-white">
                                        <AnimatedCounter
                                            value={stat.value}
                                            suffix={stat.suffix}
                                            duration={1.5}
                                        />
                                    </div>
                                    <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Search Form Card */}
                    <motion.div
                        className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <div className="relative">
                            {/* Glow Effect Behind Card */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 animate-gradient" />

                            {/* Glass Card */}
                            <div className="relative glass-light rounded-2xl p-6 sm:p-8 shadow-2xl">
                                {/* Card Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Find Your Perfect Car
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Search our premium collection
                                        </p>
                                    </div>
                                </div>

                                {/* Filters */}
                                <div className="space-y-4">
                                    <HomepageTaxonomyFilters
                                        minMaxValues={minMaxValues}
                                        searchParams={searchParams}
                                    />

                                    <div className="pt-2 space-y-3">
                                        <SearchButton count={classifiedsCount} />

                                        {isFilterApplied && (
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="w-full hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-xl"
                                            >
                                                <Link href={routes.home}>
                                                    Clear Filters ({totalFiltersApplied})
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                        <Award className="w-4 h-4 text-yellow-500" />
                                        Certified
                                    </div>
                                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                        <Shield className="w-4 h-4 text-green-500" />
                                        Warranty
                                    </div>
                                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                        <Sparkles className="w-4 h-4 text-blue-500" />
                                        Premium
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
            >
                <motion.div
                    className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-white/60"
                        animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};
