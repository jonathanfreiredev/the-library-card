import { z } from "zod";

export const getLikesStatusSchema = z.object({
  bookReviewId: z.cuid("Invalid book review ID"),
  userId: z.string().min(1, "User ID is required"),
});

export const toogleLikeSchema = z.object({
  bookReviewId: z.cuid("Invalid book review ID"),
});
