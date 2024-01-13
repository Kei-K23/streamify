import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";
import React from "react";

interface ChatMessageProps {
  message: ReceivedChatMessage;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const color = stringToColor(message.from?.name || "");
  return (
    <div className="flex gap-2 rounded-md">
      <p className="text-sm text-muted-foreground">
        {format(message.timestamp, "HH:MM")}
      </p>
      <div className="flex flex-wrap gap-1 grow items-baseline">
        <p className="text-sm font-semibold whitespace-nowrap ">
          <span className="truncate" style={{ color: color }}>
            {message.from?.name}
          </span>
        </p>
        <p className="text-sm break-all">{message.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
