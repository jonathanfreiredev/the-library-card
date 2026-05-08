import { LoginForm } from "@/components/auth/login-form";
import { getSession } from "@/lib/better-auth/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();

  const isLoggedIn = !!session?.session;

  if (isLoggedIn) {
    redirect("/");
  }

  return <LoginForm />;
}
