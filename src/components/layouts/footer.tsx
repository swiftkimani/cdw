"use client";

import { navLinks } from "@/config/constants";
import { routes } from "@/config/routes";
import { SiInstagram, SiMeta, SiX } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "../shared/newsletter-form";

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
      className="object-contain h-24 w-auto"
    />
  </div>
);

export const PublicFooter = () => {
  return (
    <footer className="relative bg-black overflow-hidden pt-16 pb-8">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      {/* Top border line */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo Column */}
          <div className="lg:col-span-1 space-y-6">
            <Link href={routes.home} className="block">
              <FooterLogo />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Premium vehicles for the discerning driver. Experience luxury and performance.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    href={link.href}
                    key={link.id}
                    className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium text-sm uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium text-sm uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li>+254 700 000 000</li>
              <li>info@lerokimotors.com</li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium text-sm uppercase tracking-wider mb-6">Stay Updated</h4>
            <p className="text-white/40 text-sm mb-4">
              Subscribe for new arrivals and exclusive deals.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
            <p>© {new Date().getFullYear()} Leroki Motors. All rights reserved.</p>
            <p>Company No. 123456789 | VAT No. GB123456789</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
