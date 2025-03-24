"use server";

import { ApiResponse } from "@/lib/types";
import { auth } from "@/server/auth";
import { db, eq } from "@/server/db";
import { urls } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

type Action = "approve" | "delete";

export async function manageFlaggedUrl(
  urlId: number,
  action: Action
): Promise<ApiResponse<null>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (session?.user?.role !== "admin") {
      return { success: false, error: "Unauthorized" };
    }

    const urlToManage = await db.query.urls.findFirst({
      where: (urls, { eq }) => eq(urls.id, urlId),
    });

    if (!urlToManage) {
      return { success: false, error: "URL not found" };
    }

    if (action === "approve") {
      await db
        .update(urls)
        .set({
          flagged: false,
          flagReason: null,
          updatedAt: new Date(),
        })
        .where(eq(urls.id, urlId));
    } else if (action === "delete") {
      await db.delete(urls).where(eq(urls.id, urlId));
    } else {
      return { success: false, error: "Invalid action" };
    }

    revalidatePath("/admin/urls");
    revalidatePath("/admin/urls/flagged");

    return { success: true, data: null };
  } catch (error) {
    console.error("Error managing flagged URL", error);
    return { success: false, error: "Internal server error" };
  }
}
