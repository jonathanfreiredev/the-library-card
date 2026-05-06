import { getSession } from "@/lib/better-auth/server";

export default async function HomePage() {
  const session = await getSession();

  const isLoggedIn = !!session?.session;

  return (
    <p>
      Hello {isLoggedIn ? session.user.name : "world"}.{" "}
      {isLoggedIn
        ? "You are authenticated!"
        : "You can log in to see more content."}
    </p>
  );
}
