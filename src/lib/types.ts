import { z } from "zod";

export const urlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  customCode: z
    .string()
    .max(20, "Custom code must be less than 255 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Custom code must be alphanumeric or hyphen")
    .optional()
    .or(z.literal(""))
    .nullable()
    .transform((val) => (val === null || val === "" ? undefined : val)),
});

export type UrlFormData = z.infer<typeof urlSchema>;

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type Url = {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
  clicks: number;
};
