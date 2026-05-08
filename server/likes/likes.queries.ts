import "server-only";
import { cacheTag } from "next/cache";
import { getLikesStatusSchema } from "./likes.schema";
import { z } from "zod";
import { getSession } from "@/lib/better-auth/server";
import { getLikesStatus } from "./likes.service";

export const getLikesStatusQuery = async ({
  bookReviewId,
}: {
  bookReviewId: string;
}) => {
  const session = await getSession();

  if (!session) return null;

  const parsedInput = getLikesStatusSchema.parse({
    bookReviewId,
    userId: session.user.id,
  });

  return getCachedLikesStatus(parsedInput);
};

const getCachedLikesStatus = async ({
  bookReviewId,
  userId,
}: z.infer<typeof getLikesStatusSchema>) => {
  "use cache";
  cacheTag(`like-status-${bookReviewId}-${userId}`);

  return getLikesStatus({
    bookReviewId,
    userId,
  });
};
