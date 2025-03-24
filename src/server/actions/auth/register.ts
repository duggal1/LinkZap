"use server";

import { ApiResponse } from "@/lib/types";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { z } from "zod";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function registerUser(
  formData: FormData
): Promise<ApiResponse<{ userId: string }>> {
  try {
    const validatedFields = registerSchema.safeParse({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error:
          validatedFields.error.flatten().fieldErrors.email?.[0] ||
          validatedFields.error.flatten().fieldErrors.password?.[0] ||
          validatedFields.error.flatten().fieldErrors.name?.[0] ||
          "Invalid data",
      };
    }

    const { name, email, password } = validatedFields.data;

    const existingUser = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.email, email.toLowerCase()),
    });

    if (existingUser) {
      return {
        success: false,
        error: "A user with this email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = nanoid();

    await db.insert(user).values({
      id: userId,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      success: true,
      data: { userId },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred. Please try again.",
    };
  }
}
