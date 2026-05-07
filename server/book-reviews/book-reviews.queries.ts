import "server-only";
import { getAllBookReviews } from "./book-reviews.service";
import { getAllBookReviewsSchema } from "./book-reviews.schema";
import { z } from "zod";
import { cacheTag } from "next/cache";

export const getAllBookReviewsQuery = async (
  input: z.infer<typeof getAllBookReviewsSchema>,
) => {
  "use cache";
  cacheTag("reviews-list");

  const parsedInput = getAllBookReviewsSchema.parse(input);

  return getAllBookReviews(parsedInput);
};
