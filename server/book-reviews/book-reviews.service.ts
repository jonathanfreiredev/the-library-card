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
  const { skip, take } = input;
  const bookReviews = await db.bookReview.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await db.bookReview.count();

  return {
    data: bookReviews,
    hasNextPage: skip + take < total,
  };
};
