import { navLinks } from "@/config/constants";
import { routes } from "@/config/routes";
import { SiInstagram, SiMeta, SiX } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "../shared/newsletter-form";

const socialLinks = [
  {
    id: 1,
    href: "https://facebook.com",
    icon: SiMeta,
  },
  {
    id: 2,
    href: "https://twitter.com",
    icon: SiX,
  },
  {
    id: 3,
    href: "https://instagram.com",
    icon: SiInstagram,
  },
];

// Logo Component for Footer
// Logo Component for Footer
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
    <footer className="bg-gray-100 dark:bg-gray-900 px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Social */}
        <div className="flex flex-col gap-4">
          <Link href={routes.home}>
            <FooterLogo />
          </Link>
          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  href={link.href}
                  key={link.id}
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={routes.signIn}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Admin
            </Link>
          </li>
        </ul>

        {/* Newsletter */}
        <NewsletterForm />
      </div>

      {/* Company Info */}
      <div className="container mx-auto mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
        <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Company Info</h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Company No. 123456789 | VAT No. GB123456789</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Leroki Motors is not authorised and not regulated by the Financial Conduct Authority
        </p>
      </div>
    </footer>
  );
};
