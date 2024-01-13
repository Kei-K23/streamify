"use client";
import { CHAT_VARIANT, useChatSidebarStore } from "@/store/use-chat-sidebar";
import React from "react";
import ActionTooltip from "../action-tooltip";
import { Button } from "../ui/button";
import { MessageSquare, UsersIcon } from "lucide-react";

const VariantToggle = () => {
  const { variant, onVariantChange } = useChatSidebarStore();

  const isChat = variant === CHAT_VARIANT.CHAT;

  const title = isChat ? "Community" : "Back to Chat";
  const Icon = isChat ? UsersIcon : MessageSquare;

  function onToggle() {
    const newVariant = isChat ? CHAT_VARIANT.COMMUNITY : CHAT_VARIANT.CHAT;
    onVariantChange(newVariant);
  }

  return (
    <ActionTooltip title={title} side="left">
      <Button variant={"ghost"} size={"sm"} onClick={onToggle}>
        <Icon className="w-4 h-4" />
      </Button>
    </ActionTooltip>
  );
};

export default VariantToggle;
