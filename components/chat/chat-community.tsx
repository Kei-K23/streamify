import { useParticipants } from "@livekit/components-react";
import React, { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import ChatCommunityItem from "./chat-community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}

const ChatCommunity = ({
  viewerName,
  hostName,
  isHidden,
}: ChatCommunityProps) => {
  const participants = useParticipants();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce<string>(value, 500);

  function onChange(newValue: string) {
    setValue(newValue);
  }

  const filterParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, curr) => {
      const hostAsViewer = `host-${curr.identity}`;

      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(curr);
      }

      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((p) => {
      return p.name?.toLowerCase().includes(debouncedValue.toLocaleLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 justify-center items-center ">
        <p className="text-sm text-muted-foreground">Community is disabled!</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        placeholder="Search community..."
        className={cn("border-zinc-300")}
        onChange={(e) => onChange(e.target.value)}
      />

      <ScrollArea className="mt-4 gap-y-2">
        <p className="text-sm text-muted-foreground text-center hidden last:block p-2">
          No results
        </p>
        {filterParticipants.map((participant) => (
          <ChatCommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
