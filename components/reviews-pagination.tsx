"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface ReviewsPaginationProps {
  currentPage: number;
  hasNextPage: boolean;
}

export function ReviewsPagination({
  currentPage,
  hasNextPage,
}: ReviewsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const firstPage = Math.max(1, currentPage - 2);
  const lastPage = hasNextPage
    ? Math.max(currentPage + 1, firstPage + 3)
    : Math.max(currentPage, firstPage + 2);

  const pages = Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index,
  );

  const goToPage = (page: number) => {
    if (page < 1) return;
    if (page > currentPage && !hasNextPage) return;

    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-4">
      <Button
        variant="outline"
        size="icon-sm"
        className="rounded-full border-zinc-300"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeftIcon className="size-4" />
      </Button>

      <div className="flex items-center gap-2">
        {pages.map((page) => {
          const active = page === currentPage;
          return (
            <motion.button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              className="relative flex size-5 items-center justify-center"
              whileTap={{ scale: 0.92 }}
              aria-label={`Go to page ${page}`}
            >
              <motion.span
                className={`block rounded-full ${
                  active ? "bg-zinc-900" : "bg-zinc-300"
                }`}
                animate={{
                  width: active ? 20 : 8,
                  height: 8,
                  opacity: active ? 1 : 0.8,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </motion.button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="icon-sm"
        className="rounded-full border-zinc-300"
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasNextPage}
        aria-label="Go to next page"
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
}
