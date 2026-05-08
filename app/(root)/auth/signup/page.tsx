import { SignupForm } from "@/components/auth/signup-form";
import { getSession } from "@/lib/better-auth/server";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getSession();

  const isLoggedIn = !!session?.session;

  if (isLoggedIn) {
    redirect("/");
  }

  return <SignupForm />;
}
