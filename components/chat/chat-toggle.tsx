"use client";
import { useChatSidebarStore } from "@/store/use-chat-sidebar";
import React from "react";
import ActionTooltip from "../action-tooltip";
import { Button } from "../ui/button";
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from "lucide-react";

const ChatToggle = () => {
  const { collapsed, onCollapsed, onExpand } = useChatSidebarStore();

  function onToggle() {
    if (collapsed) {
      onCollapsed();
    } else {
      onExpand();
    }
  }

  const title = !collapsed ? "Collapsed" : "Expand";
  const Icon = !collapsed ? ArrowLeftFromLineIcon : ArrowRightFromLineIcon;

  return (
    <ActionTooltip title={title} side="left">
      <Button variant={"ghost"} size={"sm"} onClick={onToggle}>
        <Icon className="w-4 h-4" />
      </Button>
    </ActionTooltip>
  );
};

export default ChatToggle;
