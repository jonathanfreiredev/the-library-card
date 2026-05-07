import { z } from "zod";

export const createBookReviewSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  buyUrl: z.url("URL must be a valid URL").nullable(),
  content: z.string().min(1, "Content is required"),
});

export const getAllBookReviewsSchema = z.object({
  skip: z.number().min(0).default(0),
  take: z.number().min(1).max(100).default(10),
});
