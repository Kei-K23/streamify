"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import React from "react";
import Video from "./video";
import { useChatSidebarStore } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import Chat from "../chat";
import ChatToggle from "../chat/chat-toggle";
import VideoHeader from "./video-header";
import InfoCard from "./info-card";
import AboutCard from "./about-card";

interface StreamPlayerProps {
  followersCount: number;
  user: User;
  stream: Stream;
  isFollowing: boolean;
}

const StreamPlayer = ({
  user,
  stream,
  isFollowing,
  followersCount,
}: StreamPlayerProps) => {
  const { collapsed } = useChatSidebarStore();
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return <StreamPlayer.Skeleton />;
  }

  return (
    <>
      {collapsed && (
        <div className="fixed top-20 right-3 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        token={token}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id} />
          <VideoHeader
            streamName={stream.name}
            hostUser={user}
            viewerIdentity={identity}
            isFollowing={isFollowing}
          />
          <InfoCard
            hostIdentity={user.id}
            thumbnailImg={stream.thumbnailImg}
            viewerIdentity={identity}
            streamName={stream.name}
          />
          <AboutCard
            hostUser={user}
            viewerIdentity={identity}
            followersCount={followersCount}
          />
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
    </>
  );
};

StreamPlayer.Skeleton = function StreamPlayerSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <Video.Skeleton />
        <VideoHeader.Skeleton />
        <InfoCard.Skeleton />
        <AboutCard.Skeleton />
      </div>
      <div className="col-span-1 bg-background">
        <Chat.Skeleton />
      </div>
    </div>
  );
};

export default StreamPlayer;
