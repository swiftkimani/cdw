"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { routes } from "@/config/routes";
import { ScrollReveal } from "./scroll-reveal";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export const CTASection = () => {
    return (
        <section className="relative py-24 sm:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 gradient-dark" />

            {/* Mesh Gradient Overlay */}
            <div className="absolute inset-0 gradient-mesh opacity-40" />

            {/* Floating Elements */}
            <motion.div
                className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-500/20 blur-3xl"
                animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl"
                animate={{ y: [0, 20, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <div className="container relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Text Content */}
                    <ScrollReveal>
                        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-300 bg-blue-500/20 rounded-full border border-blue-500/30">
                            Get Started Today
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            Ready to Find Your{" "}
                            <span className="text-gradient">Perfect Car?</span>
                        </h2>
                        <p className="text-lg text-white/70 mb-8 max-w-lg">
                            Our team of automotive experts is here to help you find the vehicle of your dreams.
                            Visit our showroom or get in touch today.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    href={routes.inventory}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
                                >
                                    Browse Inventory
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    href={routes.contact}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                                >
                                    Contact Us
                                </Link>
                            </motion.div>
                        </div>
                    </ScrollReveal>

                    {/* Contact Info Cards */}
                    <ScrollReveal delay={0.2}>
                        <div className="space-y-4">
                            <ContactCard
                                icon={Phone}
                                title="Call Us"
                                content="+254 700 000 000"
                                href="tel:+254700000000"
                            />
                            <ContactCard
                                icon={Mail}
                                title="Email Us"
                                content="info@lerokimotors.com"
                                href="mailto:info@lerokimotors.com"
                            />
                            <ContactCard
                                icon={MapPin}
                                title="Visit Showroom"
                                content="Nairobi, Kenya"
                                href={routes.contact}
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

interface ContactCardProps {
    icon: React.ElementType;
    title: string;
    content: string;
    href: string;
}

const ContactCard = ({ icon: Icon, title, content, href }: ContactCardProps) => {
    return (
        <motion.a
            href={href}
            className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
            whileHover={{ x: 8 }}
        >
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
                <div className="text-sm text-white/50">{title}</div>
                <div className="text-white font-medium group-hover:text-blue-300 transition-colors">
                    {content}
                </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/30 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>
    );
};
