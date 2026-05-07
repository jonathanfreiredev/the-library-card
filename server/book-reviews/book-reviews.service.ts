import "server-only";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  createBookReviewSchema,
  getAllBookReviewsSchema,
} from "./book-reviews.schema";

export const createBookReview = async (
  input: z.infer<typeof createBookReviewSchema> & { userId: string },
) => {
  const bookReview = await db.bookReview.create({
    data: input,
  });

  return bookReview;
};

export const getAllBookReviews = async (
  input: z.infer<typeof getAllBookReviewsSchema>,
) => {
  const bookReviews = await db.bookReview.findMany({
    ...input,
    orderBy: {
      createdAt: "desc",
    },
  });

  return bookReviews;
};
