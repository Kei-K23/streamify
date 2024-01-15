"use client";

import { onBlock, onUnBlock } from "@/actions/block-action";
import { onFollow, onUnFollow } from "@/actions/follow-action";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  userId: string;
  isFollowing: boolean;
  isBlocking: boolean;
}

const Actions = ({ userId, isFollowing, isBlocking }: ActionsProps) => {
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

  function onClickFollow() {
    if (isFollowing) {
      handleOnUnFollow();
    } else {
      handleOnFollow();
    }
  }

  function handleOnBlock() {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`You are now blocked ${data?.blocking.username}`)
        )
        .catch((e) => toast.error(e.message));
    });
  }

  function handleOnUnBlock() {
    startTransition(() => {
      onUnBlock(userId)
        .then((data) => toast.success(`Unblocked ${data.blocking.username}`))
        .catch((e) => toast.error(e.message));
    });
  }

  function onClickBlock() {
    if (!isBlocking) {
      handleOnUnBlock();
    } else {
      handleOnBlock();
    }
  }

  return (
    <>
      <Button onClick={onClickFollow} disabled={isPending}>
        {isFollowing ? "unFollow" : "Follow"}
      </Button>

      <Button onClick={onClickBlock} disabled={isPending}>
        {!isBlocking ? "unBlock" : "Block"}
      </Button>
    </>
  );
};

export default Actions;
