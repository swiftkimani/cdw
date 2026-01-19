"use server";

// Note: This file has been refactored to remove deprecated ai/rsc imports.
// AI generation is now handled via the /api/generate-classified API route.

import type { StreamableSkeletonProps } from "@/components/admin/classifieds/streamable-skeleton";

// Export the type for use in other components
export type { StreamableSkeletonProps };

// Type for the API response
export type GenerateClassifiedResponse = StreamableSkeletonProps & {
  error?: string;
};
