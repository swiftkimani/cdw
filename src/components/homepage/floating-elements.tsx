"use client";

import { motion } from "framer-motion";

export const FloatingElements = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large gradient orb - top right */}
            <motion.div
                className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
                }}
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Medium gradient orb - bottom left */}
            <motion.div
                className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-25"
                style={{
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)",
                }}
                animate={{
                    y: [0, 25, 0],
                    x: [0, -15, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            {/* Small accent orb - center right */}
            <motion.div
                className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)",
                }}
                animate={{
                    y: [0, -20, 0],
                    x: [0, 30, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            {/* Floating geometric shapes */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400/30 rounded-full"
                animate={{
                    y: [0, -40, 0],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400/40 rounded-full"
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            <motion.div
                className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-pink-400/25 rounded-full"
                animate={{
                    y: [0, -25, 0],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            />

            {/* Subtle grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />
        </div>
    );
};
