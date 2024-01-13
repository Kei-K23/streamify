import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";
import React from "react";
import { Skeleton } from "../ui/skeleton";

interface ChatMessageProps {
  message: ReceivedChatMessage;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const color = stringToColor(message.from?.name || "");
  return (
    <div className="px-2 py-3 flex gap-2 rounded-md w-full hover:bg-zinc-700/80 transition-all">
      <p className="text-sm text-muted-foreground">
        {format(message.timestamp, "HH:MM")}
      </p>
      <div className="flex flex-wrap gap-1 grow items-baseline">
        <p className="text-sm font-semibold whitespace-nowrap ">
          <span className="truncate" style={{ color: color }}>
            {message.from?.name}
          </span>
          :
        </p>
        <p className="text-sm break-all">{message.message}</p>
      </div>
    </div>
  );
};

ChatMessage.Skeleton = function ChatMessageSkeleton() {
  return (
    <div className=" rounded-md w-full">
      <Skeleton className="w-full h-6" />
    </div>
  );
};

export default ChatMessage;
