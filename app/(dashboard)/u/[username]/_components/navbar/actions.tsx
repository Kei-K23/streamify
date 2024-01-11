import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center gap-x-4 ">
      {user && (
        <Link
          href={`/`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-muted-foreground transition-colors"
          )}
        >
          <LogOutIcon className="w-4 h-4 mr-1" />{" "}
          <span className="hidden md:block">Exit</span>
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
