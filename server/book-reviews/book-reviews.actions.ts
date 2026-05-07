"use server";
import { protectedProcedure } from "@/lib/safe-action";
import { createBookReview } from "./book-reviews.service";
import { createBookReviewSchema } from "./book-reviews.schema";
import { updateTag } from "next/cache";

export const createBookReviewAction = protectedProcedure
  .inputSchema(createBookReviewSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { user } = ctx;

    const bookReview = await createBookReview({
      ...parsedInput,
      userId: user.id,
    });

    updateTag("reviews-list");

    return bookReview;
  });
