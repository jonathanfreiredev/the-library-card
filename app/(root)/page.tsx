import { ReviewCard } from "@/components/review-card";
import { ReviewsBoardShell } from "@/components/reviews-board-shell";
import { ReviewsPagination } from "@/components/reviews-pagination";
import { getAllBookReviewsQuery } from "@/server/book-reviews/book-reviews.queries";

const TAKE = 3;

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const pageParam = Number.parseInt(resolvedSearchParams.page ?? "1", 10);
  const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const skip = (page - 1) * TAKE;

  const reviews = await getAllBookReviewsQuery({ skip, take: TAKE });

  return (
    <ReviewsBoardShell>
      <section className="mb-10">
        <h1 className="text-4xl tracking-tight text-zinc-950 sm:text-5xl">
          The library card
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
          A curated stream of book reflections from readers, thinkers, and
          storytellers.
        </p>
      </section>

      {reviews.data.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50">
          <p className="text-zinc-600">
            No reviews yet. Be the first to write one.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reviews.data.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </section>
      )}

      <ReviewsPagination currentPage={page} hasNextPage={reviews.hasNextPage} />
    </ReviewsBoardShell>
  );
}
