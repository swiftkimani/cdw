import type { ImageLoaderProps } from "next/image";

interface CloudinaryLoaderProps extends ImageLoaderProps {
  height?: number;
}

/**
 * Cloudinary image loader for Next.js Image component
 * Provides automatic format, quality, and size optimization
 * 
 * Free tier: 25GB storage, 25GB bandwidth/month
 * Docs: https://cloudinary.com/documentation/image_transformations
 */
export const cloudinaryLoader = ({
  src,
  width,
  height,
  quality,
}: CloudinaryLoaderProps): string => {
  // If it's a local path (starts with / but not //), return as-is
  if (src.startsWith("/") && !src.startsWith("//")) {
    return src;
  }

  // If already a Cloudinary URL, apply transformations
  if (src.includes("res.cloudinary.com")) {
    // Extract the path after /upload/ and add transformations
    const uploadIndex = src.indexOf("/upload/");
    if (uploadIndex !== -1) {
      const baseUrl = src.substring(0, uploadIndex + 8); // includes /upload/
      const imagePath = src.substring(uploadIndex + 8);
      
      const transforms = [
        `w_${width}`,
        height ? `h_${height}` : null,
        `q_${quality || "auto"}`,
        "f_auto", // Auto format (webp, avif, etc.)
        "c_limit", // Limit resize (don't upscale)
      ].filter(Boolean).join(",");

      return `${baseUrl}${transforms}/${imagePath}`;
    }
  }

  // For external URLs, use Cloudinary's fetch feature
  // This allows Cloudinary to proxy and optimize any external image
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    // Fallback: return original src if no cloud name configured
    return src;
  }

  const transforms = [
    `w_${width}`,
    height ? `h_${height}` : null,
    `q_${quality || "auto"}`,
    "f_auto",
    "c_limit",
  ].filter(Boolean).join(",");

  // Use fetch mode to proxy external images through Cloudinary
  return `https://res.cloudinary.com/${cloudName}/image/fetch/${transforms}/${encodeURIComponent(src)}`;
};
