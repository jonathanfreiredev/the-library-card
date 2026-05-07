import "server-only";
import { getLikesStatus } from "./likes.service";
import { cacheTag } from "next/cache";
import { getLikesStatusSchema } from "./likes.schema";
import { z } from "zod";

export const getLikesStatusQuery = async ({
  bookReviewId,
  userId,
}: z.infer<typeof getLikesStatusSchema>) => {
  "use cache";
  cacheTag(`like-status-${bookReviewId}-${userId}`);

  const parsedInput = getLikesStatusSchema.parse({
    bookReviewId,
    userId,
  });

  return getLikesStatus(parsedInput);
};
