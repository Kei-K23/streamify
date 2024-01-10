"use client";

import { onFollow, onUnFollow } from "@/actions/follow-action";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  userId: string;
  isFollowing: boolean;
}

const Actions = ({ userId, isFollowing }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  function handleOnFollow() {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch((e) => toast.error(e.message));
    });
  }

  function handleOnUnFollow() {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) => toast.success(`Unfollowed ${data.following.username}`))
        .catch((e) => toast.error(e.message));
    });
  }

  function onClick() {
    if (isFollowing) {
      handleOnUnFollow();
    } else {
      handleOnFollow();
    }
  }
  return (
    <Button onClick={onClick} disabled={isPending}>
      {isFollowing ? "unFollow" : "Follow"}
    </Button>
  );
};

export default Actions;
