"use client";

import { useChatSidebarStore } from "@/store/use-chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import React, { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnable: boolean;
  isDelayChat: boolean;
  isChatFollowerOnly: boolean;
}

const Chat = ({
  viewerName,
  hostIdentity,
  hostName,
  isChatEnable,
  isChatFollowerOnly,
  isDelayChat,
  isFollowing,
}: ChatProps) => {
  const matches = useMediaQuery("(max-width : 1024px)");
  const [value, setValue] = useState("");
  const { collapsed, variant, onExpand } = useChatSidebarStore();
  const { chatMessages: messages, send } = useChat();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnable || !isOnline;

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  function onSubmit() {
    if (!send) return;

    if (value) {
      send(value);
      setValue("");
    }
  }

  function onChange(value: string) {
    setValue(value);
  }

  return (
    <div className="bg-background border-l border-b flex flex-col pt-0 h-[calc(100vh-80px)]">
      Chat
    </div>
  );
};

export default Chat;
