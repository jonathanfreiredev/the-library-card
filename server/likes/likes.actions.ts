"use server";
import { protectedProcedure } from "@/lib/safe-action";
import { toogleLike } from "./likes.service";
import { toogleLikeSchema } from "./likes.schema";
import { updateTag } from "next/cache";

export const toogleLikeAction = protectedProcedure
  .inputSchema(toogleLikeSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { user } = ctx;
    const { bookReviewId } = parsedInput;

    const res = await toogleLike({
      userId: user.id,
      bookReviewId,
    });

    updateTag(`like-status-${bookReviewId}-${user.id}`);
    updateTag(`reviews-list`);

    return res;
  });
