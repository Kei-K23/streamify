import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center gap-x-4 ">
      {user && (
        <Link
          href={`/u/${user.username}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-muted-foreground transition-colors"
          )}
        >
          <LayoutDashboardIcon className="w-4 h-4 mr-1" />{" "}
          <span className="hidden md:block">Dashboard</span>
        </Link>
      )}
      {!!user ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton>
          <Button size={"sm"}>Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Actions;
