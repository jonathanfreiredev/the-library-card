import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <section className="flex w-full flex-1 flex-col">
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
          >
            <Skeleton className="animation-duration-[1.8s] h-4 w-24" />
            <Skeleton className="animation-duration-[1.8s] mt-3 h-8 w-full" />
          </div>
        ))}
      </div>

      <Skeleton className="animation-duration-[1.8s] h-[360px] w-full rounded-xl sm:h-[420px]" />
    </section>
  )
}
