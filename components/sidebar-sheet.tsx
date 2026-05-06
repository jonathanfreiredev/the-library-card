"use client";
import { MenuIcon, UserIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { SidebarSheetAuth } from "./auth/sidebar-sheet-auth";
import { Button } from "./ui/button";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface SidebarSheetProps {
  isLoggedIn: boolean;
}

export function SidebarSheet({ isLoggedIn }: SidebarSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon-lg" className="rounded-sm">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="data-[vaul-Sheet-direction=bottom]:max-h-[50vh] data-[vaul-Sheet-direction=top]:max-h-[50vh]"
      >
        <SheetHeader className="flex flex-row justify-end">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetClose asChild>
            <Button variant="outline" size="icon-sm" className="rounded-full">
              <XIcon />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="flex w-full flex-col gap-0 px-2">
          <SheetClose asChild>
            <Item
              variant="default"
              size="sm"
              className="cursor-pointer"
              asChild
            >
              <Link href={isLoggedIn ? "/profile" : "/auth/login"}>
                <ItemMedia>
                  <UserIcon className="size-5" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Profile</ItemTitle>
                </ItemContent>
              </Link>
            </Item>
          </SheetClose>

          <SidebarSheetAuth />
        </div>
      </SheetContent>
    </Sheet>
  );
}
