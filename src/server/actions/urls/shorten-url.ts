"use server";

import { ApiResponse } from "@/lib/types";
import { ensureHttps, isValidUrl } from "@/lib/utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { custom, z } from "zod";
import { nanoid } from "nanoid";
import { db } from "@/server/db";
import { urls } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "@/server/auth";
import { checkUrlSafety } from "./check-url-safety";

const shortenUrlSchema = z.object({
  url: z.string().refine(isValidUrl, {
    message: "Please enter a valid URL",
  }),
  customCode: z
    .string()
    .max(20, "Custom code must be less than 255 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Custom code must be alphanumeric or hyphen")
    .optional()
    .nullable()
    .transform((val) => (val === null || val === "" ? undefined : val)),
});

export async function shortenUrl(formData: FormData): Promise<
  ApiResponse<{
    shortUrl: string;
    flagged: boolean;
    flagReason?: string | null;
    message?: string;
  }>
> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const url = formData.get("url") as string;
    const customCode = formData.get("customCode") as string;

    const validatedFields = shortenUrlSchema.safeParse({
      url,
      customCode: customCode ? customCode : undefined,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error:
          validatedFields.error.flatten().fieldErrors.url?.[0] ||
          validatedFields.error.flatten().fieldErrors.customCode?.[0] ||
          "Invalid URL",
      };
    }

    const originalUrl = ensureHttps(validatedFields.data.url);

    const safetyCheck = await checkUrlSafety(originalUrl);
    let flagged = false;
    let flagReason = null;

    if (safetyCheck.success && safetyCheck.data) {
      flagged = safetyCheck.data.flagged;
      flagReason = safetyCheck.data.reason;

      if (
        safetyCheck.data.category === "malicious" &&
        safetyCheck.data.confidence > 0.7 &&
        session?.user?.role !== "admin"
      ) {
        return {
          success: false,
          error: "This URL is flagged as malicious",
        };
      }
    }

    const shortCode = validatedFields.data.customCode || nanoid(6);

    // check if the short code already exists
    const existingUrl = await db.query.urls.findFirst({
      where: (urls, { eq }) => eq(urls.shortCode, shortCode),
    });

    if (existingUrl) {
      if (validatedFields.data.customCode) {
        return {
          success: false,
          error: "Custom code already exists",
        };
      }
      return shortenUrl(formData);
    }

    await db.insert(urls).values({
      originalUrl,
      shortCode,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: userId || null,
      flagged,
      flagReason,
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const shortUrl = `${baseUrl}/r/${shortCode}`;

    revalidatePath("/");

    return {
      success: true,
      data: {
        shortUrl,
        flagged,
        flagReason,
        message: flagged
          ? "This URL has been flagged for review by our safety system. It may be temporarily limited until approved by an administrator."
          : undefined,
      },
    };
  } catch (error) {
    console.error("Failed to shorten URL", error);
    return {
      success: false,
      error: "Failed to shorten URL",
    };
  }
}
