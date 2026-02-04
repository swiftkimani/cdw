"use client";

import { routes } from "@/config/routes";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";

interface Brand {
    id: number;
    name: string;
    image: string;
}

interface OurBrandsSectionClientProps {
    brands: Brand[];
    count: number;
}

export const OurBrandsSectionClient = ({ brands, count }: OurBrandsSectionClientProps) => {
    // Duplicate brands for seamless infinite scroll
    const duplicatedBrands = [...brands, ...brands];

    return (
        <section className="relative py-20 sm:py-28 bg-white dark:bg-gray-900 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
            </div>

            <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Header */}
                <ScrollReveal className="text-center mb-16">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 rounded-full uppercase tracking-wider">
                        Premium Partners
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Our <span className="text-gradient">Brands</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        We have <span className="font-semibold text-gray-900 dark:text-white">{count}</span> vehicles in stock from the world's most prestigious automotive brands, ready for same-day drive away.
                    </p>
                </ScrollReveal>

                {/* Marquee Container */}
                <div className="relative">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-40 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-40 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Brands - Row 1 */}
                    <div className="flex overflow-hidden mb-6">
                        <motion.div
                            className="flex gap-6 animate-marquee"
                            style={{ width: "fit-content" }}
                        >
                            {duplicatedBrands.map((brand, index) => (
                                <BrandCard key={`row1-${brand.id}-${index}`} brand={brand} />
                            ))}
                        </motion.div>
                    </div>

                    {/* Scrolling Brands - Row 2 (Reverse) */}
                    <div className="flex overflow-hidden">
                        <motion.div
                            className="flex gap-6"
                            style={{
                                width: "fit-content",
                                animation: "marquee 30s linear infinite reverse",
                            }}
                        >
                            {[...duplicatedBrands].reverse().map((brand, index) => (
                                <BrandCard key={`row2-${brand.id}-${index}`} brand={brand} />
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* CTA */}
                <ScrollReveal className="text-center mt-12" delay={0.2}>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href={routes.inventory}
                            className="inline-flex items-center gap-3 px-8 py-4 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
                        >
                            Browse All Brands
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </ScrollReveal>
            </div>
        </section>
    );
};

// Individual Brand Card Component
const BrandCard = ({ brand }: { brand: Brand }) => {
    return (
        <Link href={`${routes.inventory}?make=${brand.id}`}>
            <motion.div
                className="flex-shrink-0 w-32 h-24 lg:w-40 lg:h-28 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 p-4 cursor-pointer group"
                whileHover={{
                    scale: 1.08,
                    y: -4,
                    boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.2)",
                }}
                transition={{ duration: 0.2 }}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={brand.image}
                        alt={brand.name}
                        fill
                        className="object-contain dark:invert dark:brightness-200 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
            </motion.div>
        </Link>
    );
};
