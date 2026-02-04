"use client";

import { imageSources } from "@/config/constants";
import { routes } from "@/config/routes";
import type { AwaitedPageProps } from "@/config/types";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "../ui/button";
import { HomepageTaxonomyFilters } from "./homepage-filters";
import { SearchButton } from "./search-button";
import { AnimatedCounter } from "./animated-counter";
import { ArrowRight, ChevronDown } from "lucide-react";

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
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax transforms
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const stats = [
        { value: 500, suffix: "+", label: "Vehicles" },
        { value: 15, suffix: "+", label: "Brands" },
        { value: 98, suffix: "%", label: "Satisfied" },
    ];

    return (
        <section ref={containerRef} className="relative min-h-[100vh] flex items-center overflow-hidden bg-black -mt-20">
            {/* Background Image with True Parallax */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${imageSources.carLinup})`,
                    y: backgroundY,
                }}
            />

            {/* Dramatic dark overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }} />

            {/* Main Content */}
            <div className="container relative z-10 mx-auto px-6 lg:px-8 pt-32 pb-20">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[70vh]">

                    {/* Left Side - Text Content (7 cols) */}
                    <motion.div
                        className="lg:col-span-7 space-y-8"
                        style={{ y: textY, opacity }}
                    >
                        {/* Overline */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="inline-flex items-center gap-3 text-white/40 text-sm uppercase tracking-[0.2em] font-medium">
                                <span className="w-12 h-px bg-white/30" />
                                Premium Automotive
                            </span>
                        </motion.div>

                        {/* Main Headline - Big and Bold */}
                        <motion.h1
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <span className="block">Drive</span>
                            <span className="block text-white/20">Your</span>
                            <span className="block">Dreams</span>
                        </motion.h1>

                        {/* Subline */}
                        <motion.p
                            className="text-lg text-white/50 max-w-md leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            Discover an exclusive collection of premium vehicles.
                            Uncompromised luxury. Unmatched performance.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-wrap gap-4 pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Link
                                href={routes.inventory}
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-none hover:bg-white/90 transition-all duration-300"
                            >
                                View Collection
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href={routes.contact}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-medium rounded-none border border-white/20 hover:bg-white/5 transition-all duration-300"
                            >
                                Book Test Drive
                            </Link>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div
                            className="flex items-center gap-8 pt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl font-bold text-white">
                                        <AnimatedCounter
                                            value={stat.value}
                                            suffix={stat.suffix}
                                            duration={1.5}
                                        />
                                    </div>
                                    <div className="text-xs text-white/30 uppercase tracking-wider mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Search Card (5 cols) */}
                    <motion.div
                        className="lg:col-span-5"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 lg:p-8">
                            {/* Card Header */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-1">
                                    Find Your Car
                                </h3>
                                <p className="text-sm text-white/40">
                                    Search our premium collection
                                </p>
                            </div>

                            {/* Filters */}
                            <div className="space-y-4">
                                <HomepageTaxonomyFilters
                                    minMaxValues={minMaxValues}
                                    searchParams={searchParams}
                                />

                                <div className="pt-4 space-y-3">
                                    <SearchButton count={classifiedsCount} />

                                    {isFilterApplied && (
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="w-full bg-transparent border-white/20 text-white hover:bg-white/5"
                                        >
                                            <Link href={routes.home}>
                                                Clear Filters ({totalFiltersApplied})
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-5 h-5 text-white/30" />
                </motion.div>
            </motion.div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
};
