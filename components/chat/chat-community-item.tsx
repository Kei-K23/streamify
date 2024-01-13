"use client";

import { cn, stringToColor } from "@/lib/utils";
import React, { useTransition } from "react";
import ActionTooltip from "../action-tooltip";
import { Button } from "../ui/button";
import { MinusCircleIcon } from "lucide-react";
import { onBlock } from "@/actions/block-action";
import { toast } from "sonner";

interface ChatCommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

const ChatCommunityItem = ({
  hostName,
  viewerName,
  participantIdentity,
  participantName,
}: ChatCommunityItemProps) => {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  function handleBlock() {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Successfully blocked ${participantName}`))
        .catch(() => toast.error(`Something went wrong!`));
    });
  }

  return (
    <div
      className={cn(
        "group px-2 py-3 flex items-center justify-between gap-2 rounded-md w-full hover:bg-zinc-700/80 transition-all",
        isPending && "opacity-75 pointer-events-none"
      )}
    >
      <p className="text-sm text-muted-foreground" style={{ color: color }}>
        {participantName}
      </p>
      {isHost && !isSelf && (
        <ActionTooltip title="Block">
          <Button
            disabled={isPending}
            onClick={handleBlock}
            size={"sm"}
            variant={"ghost"}
            className="opacity-0 group-hover:opacity-100 h-auto w-auto p-1"
          >
            <MinusCircleIcon className="w-4 h-4" />
          </Button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ChatCommunityItem;
