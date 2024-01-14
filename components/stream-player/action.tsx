"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { onFollow, onUnFollow } from "@/actions/follow-action";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionProps {
  isHost: boolean;
  hostIdentity: string;
  isFollowing: boolean;
}

const Action = ({ isHost, isFollowing, hostIdentity }: ActionProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  function handleFollow() {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now follow ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong!"));
    });
  }

  function handleUnFollow() {
    startTransition(() => {
      onUnFollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong!"));
    });
  }

  function onToggleFollow() {
    if (!userId) {
      return router.push("/sign-in");
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  }

  return (
    <Button
      disabled={isPending || isHost}
      variant={"primary"}
      className="w-full lg:w-auto"
      onClick={onToggleFollow}
    >
      <HeartIcon
        className={cn("w-5 h-5 mr-1", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

Action.Skeleton = function ActionSkeleton() {
  return <Skeleton className="w-[70px] h-[40px]" />;
};

export default Action;
