import { prisma } from "./prisma";
import "server-only";

/**
 * Get all favourite classified IDs for a given source (anonymous session)
 */
export async function getFavouriteIds(sourceId: string): Promise<number[]> {
  const favourites = await prisma.favourite.findMany({
    where: { sourceId },
    select: { classifiedId: true },
  });
  return favourites.map((f) => f.classifiedId);
}

/**
 * Toggle a classified in favourites - adds if not present, removes if present
 * Returns the updated list of favourite IDs
 */
export async function toggleFavourite(
  sourceId: string,
  classifiedId: number
): Promise<number[]> {
  // Check if already exists
  const existing = await prisma.favourite.findUnique({
    where: {
      sourceId_classifiedId: { sourceId, classifiedId },
    },
  });

  if (existing) {
    // Remove from favourites
    await prisma.favourite.delete({
      where: { id: existing.id },
    });
  } else {
    // Add to favourites
    await prisma.favourite.create({
      data: { sourceId, classifiedId },
    });
  }

  // Return updated list
  return getFavouriteIds(sourceId);
}

/**
 * Check if a specific classified is in favourites
 */
export async function isFavourite(
  sourceId: string,
  classifiedId: number
): Promise<boolean> {
  const favourite = await prisma.favourite.findUnique({
    where: {
      sourceId_classifiedId: { sourceId, classifiedId },
    },
  });
  return !!favourite;
}
