"use client";

import { cloudinaryLoader } from "@/lib/cloudinary-loader";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type OptimizedImageProps = Omit<ImageProps, "priority" | "loading">;

/**
 * Optimized image component using Cloudinary for transformations
 * Falls back to direct image loading if Cloudinary is not configured or on error
 */
export const OptimizedImage = (props: OptimizedImageProps) => {
  const [error, setError] = useState(false);

  // On error, fall back to default Next.js image handling
  if (error) {
    return <Image fetchPriority="high" {...props} />;
  }

  return (
    <Image
      fetchPriority="high"
      loader={(imgProps) => cloudinaryLoader(imgProps)}
      onError={() => setError(true)}
      {...props}
    />
  );
};

// Re-export with legacy name for backwards compatibility
export const ImgixImage = OptimizedImage;
