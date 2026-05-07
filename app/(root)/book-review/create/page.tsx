import { redirect } from "next/navigation"
import { CreateReviewForm } from "@/components/create-review-form"
import { getSession } from "@/lib/better-auth/server"

export default async function CreateBookReviewPage() {
  const session = await getSession()

  const isLoggedIn = !!session?.session

  if (!isLoggedIn) {
    redirect("/auth/login")
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <CreateReviewForm />
    </div>
  )
}
