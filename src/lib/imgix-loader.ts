import { env } from "@/env";
import type { ImageLoaderProps } from "next/image";

interface LoaderProps extends ImageLoaderProps {
  height?: number;
}

export const imgixLoader = ({ src, width, height, quality }: LoaderProps) => {
  // If it's a local path (starts with / but not //), return as-is
  if (src.startsWith('/') && !src.startsWith('//')) {
    return src;
  }

  // If it's not a valid URL, return as-is to avoid crashes
  try {
    const url = new URL(src);

    url.searchParams.set("w", width.toString());
    url.searchParams.set("auto", "format,compress");
    if (height) url.searchParams.set("h", height.toString());
    if (quality) url.searchParams.set("q", quality.toString());

    // Remove leading slash to avoid double-slash in URL
    const path = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;
    const params = url.searchParams.toString();

    return `${env.NEXT_PUBLIC_IMGIX_URL}/${path}?${params}`;
  } catch {
    // If URL parsing fails, return the src as-is
    return src;
  }
};


