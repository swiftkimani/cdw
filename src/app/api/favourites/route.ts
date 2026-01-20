import { validateIdSchema } from "@/app/schemas/id.schema";
import { routes } from "@/config/routes";
import type { Favourites } from "@/config/types";
import { redis } from "@/lib/redis-store";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

const SOURCE_ID_KEY = "sourceId";
const FAVOURITES_COOKIE_KEY = "favourites_fallback";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { data, error } = validateIdSchema.safeParse(body);

    if (!data) {
      return NextResponse.json({ error: error?.message }, { status: 400 });
    }

    if (typeof data.id !== "number") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // get the source id from cookies (read-only in API route)
    const cookieStore = await cookies();
    let sourceId = cookieStore.get(SOURCE_ID_KEY)?.value;
    let needsNewCookie = false;
    
    if (!sourceId) {
      sourceId = uuid();
      needsNewCookie = true;
    }

    let favourites: Favourites = { ids: [] };
    let useRedis = true;

    // Try to retrieve from Redis, fall back to cookie storage
    try {
      const storedFavourites = await redis.get<Favourites>(sourceId);
      favourites = storedFavourites || { ids: [] };
    } catch (redisErr) {
      console.warn("Redis unavailable, using cookie fallback:", redisErr);
      useRedis = false;
      // Try to read from fallback cookie
      const fallbackCookie = cookieStore.get(FAVOURITES_COOKIE_KEY)?.value;
      if (fallbackCookie) {
        try {
          favourites = JSON.parse(fallbackCookie);
        } catch {
          favourites = { ids: [] };
        }
      }
    }

    if (favourites.ids.includes(data.id)) {
      // remove the ID if it already exists
      favourites.ids = favourites.ids.filter((favId) => favId !== data.id);
    } else {
      // add the id if it does not exist
      favourites.ids.push(data.id);
    }

    // Try to update Redis, or use cookie fallback
    if (useRedis) {
      try {
        await redis.set(sourceId, favourites);
      } catch (redisErr) {
        console.warn("Redis set failed, will use cookie fallback:", redisErr);
        useRedis = false;
      }
    }

    revalidatePath(routes.favourites);

    // Create response and set cookie if needed
    const response = NextResponse.json({ ids: favourites.ids }, { status: 200 });
    
    if (needsNewCookie) {
      response.cookies.set(SOURCE_ID_KEY, sourceId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });
    }

    // If Redis failed, store favourites in cookie as fallback
    if (!useRedis) {
      response.cookies.set(FAVOURITES_COOKIE_KEY, JSON.stringify(favourites), {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (err) {
    console.error("Favourites API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
};