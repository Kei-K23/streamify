"use client";

import { onUnBlock } from "@/actions/block-action";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

const UnblockBtn = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  function onClick() {
    if (!id) return;
    startTransition(() => {
      onUnBlock(id)
        .then((data) => {
          toast.success(`Successfully unblock ${data.blocking.username}.`);
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  }

  return (
    <Button
      onClick={onClick}
      disabled={isPending}
      size={"sm"}
      variant={"outline"}
    >
      Unblock
    </Button>
  );
};

export default UnblockBtn;
