import { ReceivedChatMessage } from "@livekit/components-react";
import React from "react";
import ChatMessage from "./chat-message";

interface ChatMessagesListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

const ChatMessagesList = ({ messages, isHidden }: ChatMessagesListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 justify-center items-center ">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is disabled!" : "Welcome to the Chat!"}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full gap-y-2">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} message={message} />
      ))}
    </div>
  );
};

ChatMessagesList.Skeleton = function ChatMessageListSkeleton() {
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full gap-y-2">
      {[...Array(3)].map((_, i) => (
        <ChatMessage.Skeleton key={i} />
      ))}
    </div>
  );
};
export default ChatMessagesList;
