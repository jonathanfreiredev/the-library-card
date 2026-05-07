import { getSession } from "@/lib/better-auth/server";
import Link from "next/link";
import { SignInOrSignUpButton } from "./auth/sign-in-or-sign-up-button";
import { SidebarSheet } from "./sidebar-sheet";
import { DropdownAvatarMenu } from "./dropdown-avatar-menu";
import { Button } from "./ui/button";

export async function Header() {
  const session = await getSession();

  const isLoggedIn = !!session?.session;

  return (
    <header className="h-24 border-b px-6">
      <div className="flex h-full w-full items-center justify-between">
        <Link href="/" passHref className="flex h-full items-center">
          <h1 className="relative">The library card</h1>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="lg"
            asChild
            className="hidden sm:inline-flex"
          >
            <Link href={isLoggedIn ? "/book-review/create" : "/auth/login"}>
              Create Review
            </Link>
          </Button>

          <div className="hidden sm:flex">
            {isLoggedIn ? (
              <DropdownAvatarMenu user={{ name: session.user.name }} />
            ) : (
              <SignInOrSignUpButton />
            )}
          </div>

          <div className="flex sm:hidden">
            <SidebarSheet isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
    </header>
  );
}
