"use server";

import { ApiResponse } from "@/lib/types";
import { auth } from "@/server/auth";
import { db, eq } from "@/server/db";
import { urls } from "@/server/db/schema";

export async function deleteUrl(urlId: number): Promise<ApiResponse<null>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const [url] = await db.select().from(urls).where(eq(urls.id, urlId));

    if (!url) {
      return {
        success: false,
        error: "URL not found",
      };
    }

    if (url.userId && url.userId !== session.user.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await db.delete(urls).where(eq(urls.id, urlId));

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error("Error deleting URL", error);
    return {
      success: false,
      error: "An error occurred",
    };
  }
}
