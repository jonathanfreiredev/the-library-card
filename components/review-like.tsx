"use client";

import { HeartIcon } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { toogleLikeAction } from "@/server/likes/likes.actions";
import { Button } from "./ui/button";

interface ReviewLikeProps {
  bookReviewId: string;
  initialLiked: boolean;
  initialLikesCount: number;
  isAuthenticated: boolean;
}

export function ReviewLike({
  bookReviewId,
  initialLiked,
  initialLikesCount,
  isAuthenticated,
}: ReviewLikeProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const { executeAsync, isExecuting } = useAction(toogleLikeAction);

  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const previousLiked = liked;
    const previousLikesCount = likesCount;
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikesCount((prev) => (nextLiked ? prev + 1 : Math.max(prev - 1, 0)));

    const result = await executeAsync({ bookReviewId });

    if (result?.data) {
      setLiked(result.data.liked);
      return;
    }

    setLiked(previousLiked);
    setLikesCount(previousLikesCount);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="text-muted-foreground hover:text-foreground h-auto px-0"
      onClick={handleToggleLike}
      disabled={isExecuting}
      aria-label={liked ? "Unlike review" : "Like review"}
    >
      <motion.span
        key={liked ? "liked" : "unliked"}
        initial={{ scale: 1 }}
        animate={liked ? { scale: [1, 1.25, 1] } : { scale: [1, 0.9, 1] }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mr-2 inline-flex"
      >
        <HeartIcon
          className={`size-4 ${liked ? "fill-foreground text-foreground" : ""}`}
        />
      </motion.span>
      <span className="text-sm">{likesCount}</span>
    </Button>
  );
}
