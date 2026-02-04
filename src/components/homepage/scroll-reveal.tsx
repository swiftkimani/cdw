"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    once?: boolean;
}

export const ScrollReveal = ({
    children,
    className = "",
    delay = 0,
    duration = 0.6,
    direction = "up",
    distance = 30,
    once = true,
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const getInitialPosition = () => {
        switch (direction) {
            case "up":
                return { y: distance, x: 0 };
            case "down":
                return { y: -distance, x: 0 };
            case "left":
                return { y: 0, x: distance };
            case "right":
                return { y: 0, x: -distance };
            case "none":
                return { y: 0, x: 0 };
        }
    };

    const initial = getInitialPosition();

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, ...initial }}
            animate={
                isInView
                    ? { opacity: 1, y: 0, x: 0 }
                    : { opacity: 0, ...initial }
            }
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1] as const,
            }}
        >
            {children}
        </motion.div>
    );
};

// Stagger container for child animations
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

export const StaggerContainer = ({
    children,
    className = "",
    staggerDelay = 0.1,
}: StaggerContainerProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
};

// Individual stagger item
interface StaggerItemProps {
    children: ReactNode;
    className?: string;
}

export const StaggerItem = ({ children, className = "" }: StaggerItemProps) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1] as const,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
};
