import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookReview } from "@/lib/generated/prisma/client";
import { getLikesStatusQuery } from "@/server/likes/likes.queries";
import { ReviewCardMotion } from "./review-card-motion";
import { ReviewLike } from "./review-like";

interface ReviewCardProps {
  review: BookReview;
}

export async function ReviewCard({ review }: ReviewCardProps) {
  const isLiked = await getLikesStatusQuery({ bookReviewId: review.id });

  return (
    <ReviewCardMotion>
      <Card className="border-zinc-200 bg-white/70 backdrop-blur-sm">
        <CardHeader className="space-y-2">
          <p className="text-xs tracking-[0.22em] text-zinc-500 uppercase">
            {review.author}
          </p>
          <CardTitle className="text-xl leading-tight text-zinc-950">
            {review.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="line-clamp-6 text-sm leading-7 text-zinc-700">
            {review.content}
          </p>

          <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
            <ReviewLike
              bookReviewId={review.id}
              isLiked={!!isLiked}
              likesCount={review.likesCount}
              isAuthenticated={isLiked !== null}
            />

            {review.buyUrl ? (
              <a
                href={review.buyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs font-medium tracking-wide text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline"
              >
                Buy Book
              </a>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </ReviewCardMotion>
  );
}
