import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const createVenueSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  city: z.string().optional(),
});

export const uploadImagesSchema = z.object({
  venueId: z.string(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateVenueInput = z.infer<typeof createVenueSchema>;
export type UploadImagesInput = z.infer<typeof uploadImagesSchema>;

