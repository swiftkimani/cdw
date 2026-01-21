import { env } from "@/env";
import { mapToTaxonomyOrCreate } from "@/lib/ai-utils";
import { prisma } from "@/lib/prisma";
import { createOpenAI } from "@ai-sdk/openai";
import { type CoreMessage, generateObject } from "ai";
import { NextResponse } from "next/server";
import {
  ClassifiedDetailsAISchema,
  ClassifiedTaxonomyAISchema,
} from "@/app/schemas/classified-ai.schema";

const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    // Step 1: Generate taxonomy (make, model, year, etc.)
    const { object: taxonomy } = await generateObject({
      model: openai("gpt-4o-mini-2024-07-18"),
      schema: ClassifiedTaxonomyAISchema,
      system:
        "You are an expert at analysing images of vehicles and responding with a structured JSON object based on the schema provided",
      messages: [
        {
          role: "user",
          content: [
            { type: "image", image },
            {
              type: "text",
              text: "You are tasked with returning the structured data for the vehicle in the image attached.",
            },
          ],
        },
      ] as CoreMessage[],
    });

    // Build title from taxonomy
    const title =
      `${taxonomy.year} ${taxonomy.make} ${taxonomy.model} ${taxonomy.modelVariant ? ` ${taxonomy.modelVariant}` : ""}`.trim();

    // Map to existing taxonomy or create new entries
    const foundTaxonomy = await mapToTaxonomyOrCreate({
      year: taxonomy.year,
      make: taxonomy.make,
      model: taxonomy.model,
      modelVariant: taxonomy.modelVariant,
    });

    let classifiedData: Record<string, unknown> = {
      image,
      title,
      ...foundTaxonomy,
    };

    // Get the make record for the form
    if (foundTaxonomy) {
      const make = await prisma.make.findFirst({
        where: { name: foundTaxonomy.make },
      });

      if (make) {
        classifiedData = {
          ...classifiedData,
          make,
          makeId: make.id,
        };
      }
    }

    // Step 2: Generate details (odometer, fuel type, etc.)
    const { object: details } = await generateObject({
      model: openai("gpt-4o-mini-2024-07-18"),
      schema: ClassifiedDetailsAISchema,
      system:
        "You are an expert at writing vehicle descriptions and generating structured data",
      messages: [
        {
          role: "user",
          content: [
            { type: "image", image },
            {
              type: "text",
              text: `Based on the image provided, you are tasked with determining the odometer reading, doors, seats, ULEZ compliance, transmission, colour, fuel type, body type, drive type, VRM and any addition details in the schema provided for the ${title}. You must be accurate when determining the values for these properties even if the image is not clear.`,
            },
          ],
        },
      ] as CoreMessage[],
    });

    // Combine all data
    classifiedData = {
      ...classifiedData,
      ...details,
    };

    return NextResponse.json(classifiedData);
  } catch (error) {
    console.error("Error generating classified:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate classified" },
      { status: 500 }
    );
  }
}
