"use client";

import { toogleLikeAction } from "@/server/likes/likes.actions";
import { HeartIcon } from "lucide-react";
import { motion } from "motion/react";
import { useOptimisticAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface ReviewLikeProps {
  bookReviewId: string;
  isLiked: boolean;
  likesCount: number;
  isAuthenticated: boolean;
}

export function ReviewLike({
  bookReviewId,
  isLiked,
  likesCount,
  isAuthenticated,
}: ReviewLikeProps) {
  const router = useRouter();

  const { execute, optimisticState, isExecuting } = useOptimisticAction(
    toogleLikeAction,
    {
      currentState: {
        isLiked,
        likesCount,
      },
      updateFn: (state) => {
        if (state.isLiked) {
          return {
            isLiked: false,
            likesCount: likesCount - 1,
          };
        } else {
          return {
            isLiked: true,
            likesCount: likesCount + 1,
          };
        }
      },
    },
  );

  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    execute({ bookReviewId });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="text-muted-foreground hover:text-foreground h-auto px-0"
      onClick={handleToggleLike}
      disabled={isExecuting}
      aria-label={optimisticState.isLiked ? "Unlike review" : "Like review"}
    >
      <motion.span
        key={optimisticState.isLiked ? "liked" : "unliked"}
        initial={{ scale: 1 }}
        animate={
          optimisticState.isLiked
            ? { scale: [1, 1.25, 1] }
            : { scale: [1, 0.9, 1] }
        }
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mr-2 inline-flex"
      >
        <HeartIcon
          className={`size-4 ${optimisticState.isLiked ? "fill-foreground text-foreground" : ""}`}
        />
      </motion.span>
      <span className="text-sm">{optimisticState.likesCount}</span>
    </Button>
  );
}
