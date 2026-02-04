"use client";

import { motion } from "framer-motion";

export const FloatingElements = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Very subtle white ambient glow - top right */}
            <motion.div
                className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-5"
                style={{
                    background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
                }}
                animate={{
                    y: [0, -20, 0],
                    x: [0, 15, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Subtle ambient glow - bottom left */}
            <motion.div
                className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-5"
                style={{
                    background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
                }}
                animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
        </div>
    );
};
