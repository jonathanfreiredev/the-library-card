"use client";
import { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { authClient } from "@/lib/better-auth/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

interface DropdownAvatarMenuProps {
  user: {
    name: string;
  };
}
export const DropdownAvatarMenu = ({ user }: DropdownAvatarMenuProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer" size="lg">
          {/* <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                /> */}
          <AvatarFallback className="bg-slate-100">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={async () => {
            setIsSubmitting(true);
            await authClient.signOut();
            window.location.reload();
            setIsSubmitting(false);
          }}
          disabled={isSubmitting}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
