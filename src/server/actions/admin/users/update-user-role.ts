"use server";

import { ApiResponse } from "@/lib/types";
import { auth } from "@/server/auth";
import { db, eq } from "@/server/db";
import { userRoleEnum, user } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export async function updateUserRole(
  userId: string,
  role: "user" | "admin"
): Promise<ApiResponse<null>> {
  try {
    // Verify authentication and admin role
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    if (session.user.role !== "admin") {
      return {
        success: false,
        error: "Insufficient permissions",
      };
    }

    // Prevent changing own role
    if (session.user.id === userId) {
      return {
        success: false,
        error: "You cannot change your own role",
      };
    }

    if (!userRoleEnum.enumValues.includes(role)) {
      return {
        success: false,
        error: "Invalid role",
      };
    }

    const userToUpdate = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.id, userId),
    });

    if (!userToUpdate) {
      return {
        success: false,
        error: "User not found",
      };
    }

    await db
      .update(user)
      .set({
        role,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId));

    revalidatePath("/admin/users");

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      success: false,
      error: "An error occurred while updating user",
    };
  }
}
