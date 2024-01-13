"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import React from "react";
import Video from "./video";
import { useChatSidebarStore } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import Chat from "../chat";

interface StreamPlayerProps {
  user: User;
  stream: Stream;
  isFollowing: boolean;
}

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { collapsed } = useChatSidebarStore();
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return <div>Cannot watch the stream</div>;
  }

  return (
    <LiveKitRoom
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      token={token}
      className={cn(
        "grid h-full grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6",
        collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
      )}
    >
      <div className="space-y-4 lg:overflow-y-auto col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 pb-10 hidden-scrollbar">
        <Video hostName={user.username} hostIdentity={user.id} />
      </div>

      <div className={cn("col-span-1", collapsed && "hidden")}>
        <Chat
          viewerName={name}
          hostName={user.username}
          hostIdentity={user.id}
          isFollowing={isFollowing}
          isChatEnable={stream.isChatEnable}
          isDelayChat={stream.isDelayChat}
          isChatFollowerOnly={stream.isChatFollowerOnly}
        />
      </div>
    </LiveKitRoom>
  );
};

export default StreamPlayer;
