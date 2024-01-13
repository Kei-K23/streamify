"use client";
import React, { useMemo } from "react";
import ActionTooltip from "../action-tooltip";
import { Info } from "lucide-react";

interface ChatInfoProps {
  isChatFollowerOnly: boolean;
  isDelayChat: boolean;
}

const ChatInfo = ({ isChatFollowerOnly, isDelayChat }: ChatInfoProps) => {
  const title = useMemo(() => {
    if (isChatFollowerOnly && !isDelayChat) {
      return "Only followers can chat.";
    }

    if (!isChatFollowerOnly && isDelayChat) {
      return "Messages are delayed by 3 second.";
    }

    if (isChatFollowerOnly && isDelayChat) {
      return "Only followers can chat and messages are delayed by 3 second.";
    }
    return "";
  }, [isChatFollowerOnly, isDelayChat]);

  const label = useMemo(() => {
    if (isChatFollowerOnly && !isDelayChat) {
      return "Followers only";
    }

    if (!isChatFollowerOnly && isDelayChat) {
      return "Delay messages";
    }

    if (isChatFollowerOnly && isDelayChat) {
      return "Followers only delay messages";
    }
    return "";
  }, [isChatFollowerOnly, isDelayChat]);

  if (!isDelayChat && !isChatFollowerOnly) {
    return null;
  }
  return (
    <div className="text-muted-foreground flex items-center gap-x-2 w-full rounded-md px-4 py-2 bg-zinc-900 mb-2">
      <ActionTooltip title={title}>
        <Info className="w-4 h-4" />
      </ActionTooltip>
      <p className="text-xs">{label}</p>
    </div>
  );
};

export default ChatInfo;
