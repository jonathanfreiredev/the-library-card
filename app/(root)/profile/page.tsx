import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/auth/profile-form";
import { getSession } from "@/lib/better-auth/server";

export default async function ProfilePage() {
  const session = await getSession();

  const isLoggedIn = !!session?.session;

  if (!isLoggedIn) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <ProfileForm
        user={{
          name: session?.user.name || "",
          email: session?.user.email || "",
        }}
      />
    </div>
  );
}
