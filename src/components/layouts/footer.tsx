"use client";

import { navLinks } from "@/config/constants";
import { routes } from "@/config/routes";
import { SiInstagram, SiMeta, SiX } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "../shared/newsletter-form";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const socialLinks = [
  { id: 1, href: "https://facebook.com", icon: SiMeta },
  { id: 2, href: "https://twitter.com", icon: SiX },
  { id: 3, href: "https://instagram.com", icon: SiInstagram },
];

const FooterLogo = () => (
  <div className="flex items-center gap-2">
    <Image
      src="/logo.png"
      alt="Leroki Motors Logo"
      width={400}
      height={160}
      className="object-contain h-32 w-auto rounded-lg"
    />
  </div>
);

export const PublicFooter = () => {
  return (
    <footer className="relative bg-gray-900 overflow-hidden pt-20 pb-10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-950/20 to-gray-950 pointer-events-none" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }} />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        {/* CTA SECTION INTEGRATED */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 border-b border-white/10 pb-20">
          <div>
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              Get Started Today
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Find Your <span className="text-gradient">Perfect Car?</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-lg">
              Our team of automotive experts is here to help you find the vehicle of your dreams.
              Visit our showroom or get in touch today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={routes.inventory}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 transform hover:-translate-y-1"
              >
                Browse Inventory
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={routes.contact}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <ContactCard icon={Phone} title="Call Us" content="+254 700 000 000" href="tel:+254700000000" />
            <ContactCard icon={Mail} title="Email Us" content="info@lerokimotors.com" href="mailto:info@lerokimotors.com" />
            <ContactCard icon={MapPin} title="Visit Showroom" content="Nairobi, Kenya" href={routes.contact} />
          </div>
        </div>

        {/* Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo Column */}
          <div className="space-y-6">
            <Link href={routes.home} className="block">
              <FooterLogo />
            </Link>
            <p className="text-white/50 text-sm max-w-xs">
              Premium vehicles for the discerning driver. Experience luxury and performance like never before.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    href={link.href}
                    key={link.id}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-600 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={routes.signIn}
                  className="text-white/60 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6">Stay Updated</h4>
            <p className="text-white/60 mb-6 text-sm">
              Subscribe to our inventory updates and be the first to know about new arrivals and exclusive deals.
            </p>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="text-sm font-bold text-white/80 mb-1">Company Info</h4>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-xs text-white/40">
              <span>Company No. 123456789</span>
              <span className="hidden md:inline">•</span>
              <span>VAT No. GB123456789</span>
            </div>
          </div>
          <p className="text-xs text-white/30 max-w-md text-center md:text-right">
            Leroki Motors is not authorised and not regulated by the Financial Conduct Authority
          </p>
        </div>
      </div>
    </footer>
  );
};

const ContactCard = ({ icon: Icon, title, content, href }: { icon: any, title: string, content: string, href: string }) => (
  <Link
    href={href}
    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group"
  >
    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <div className="text-xs text-white/40 uppercase tracking-wider mb-0.5">{title}</div>
      <div className="text-white font-medium group-hover:text-blue-300 transition-colors">{content}</div>
    </div>
    <ArrowRight className="w-4 h-4 text-white/20 ml-auto opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
  </Link>
);
