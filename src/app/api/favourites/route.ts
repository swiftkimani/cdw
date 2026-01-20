import { validateIdSchema } from "@/app/schemas/id.schema";
import { routes } from "@/config/routes";
import { toggleFavourite } from "@/lib/favourites-db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

const SOURCE_ID_KEY = "sourceId";

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

    // Get or create source ID from cookies
    const cookieStore = await cookies();
    let sourceId = cookieStore.get(SOURCE_ID_KEY)?.value;
    let needsNewCookie = false;

    if (!sourceId) {
      sourceId = uuid();
      needsNewCookie = true;
    }

    // Toggle favourite in database
    const ids = await toggleFavourite(sourceId, data.id);

    revalidatePath(routes.favourites);

    // Create response and set cookie if needed
    const response = NextResponse.json({ ids }, { status: 200 });

    if (needsNewCookie) {
      response.cookies.set(SOURCE_ID_KEY, sourceId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
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