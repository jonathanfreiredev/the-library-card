import "server-only";
import { db } from "@/lib/db";
import { z } from "zod";
import { getLikesStatusSchema, toogleLikeSchema } from "./likes.schema";

export const getLikesStatus = async ({
  bookReviewId,
  userId,
}: z.infer<typeof getLikesStatusSchema>) => {
  const userLike = await db.like.findFirst({
    where: {
      userId,
      bookReviewId,
    },
  });

  return !!userLike;
};

export const toogleLike = async (
  input: z.infer<typeof toogleLikeSchema> & { userId: string },
) => {
  const { userId, bookReviewId } = input;

  const existingLike = await db.like.findFirst({
    where: {
      userId,
      bookReviewId,
    },
  });

  if (existingLike) {
    await db.$transaction([
      db.like.delete({
        where: {
          userId_bookReviewId: {
            userId,
            bookReviewId,
          },
        },
      }),
      db.bookReview.update({
        where: {
          id: bookReviewId,
        },
        data: {
          likesCount: {
            decrement: 1,
          },
        },
      }),
    ]);

    return { liked: false };
  } else {
    await db.$transaction([
      db.like.create({
        data: {
          userId,
          bookReviewId,
        },
      }),
      db.bookReview.update({
        where: {
          id: bookReviewId,
        },
        data: {
          likesCount: {
            increment: 1,
          },
        },
      }),
    ]);

    return { liked: true };
  }
};
