"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

interface WhatsAppButtonProps {
    phoneNumber?: string; // e.g., "254712345678"
    message?: string;
    className?: string;
    variant?: "default" | "outline" | "ghost" | "secondary";
    fullWidth?: boolean;
}

export const WhatsAppButton = ({
    phoneNumber = "254700000000", // Default placeholder, user should update config
    message = "Hi, I'm interested in a car.",
    className,
    variant = "default",
    fullWidth = false
}: WhatsAppButtonProps) => {

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
        <Button
            asChild
            variant={variant}
            className={`${fullWidth ? "w-full" : ""} bg-[#25D366] hover:bg-[#128C7E] text-white border-transparent ${className}`}
        >
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <SiWhatsapp className="mr-2 h-4 w-4" />
                Chat on WhatsApp
            </Link>
        </Button>
    );
};
