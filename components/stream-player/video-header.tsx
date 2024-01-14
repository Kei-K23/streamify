"use client";

import React from "react";
import UserAvatar from "../user-avatar";
import { User } from "@prisma/client";
import CheckMark from "./check-mark";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import Action from "./action";
import { Skeleton } from "../ui/skeleton";

interface VideoHeaderProps {
  hostUser: User;
  viewerIdentity: string;
  isFollowing: boolean;
  streamName: string;
}

const VideoHeader = ({
  hostUser,
  isFollowing,
  viewerIdentity,
  streamName,
}: VideoHeaderProps) => {
  const participant = useRemoteParticipant(hostUser.id);
  const participants = useParticipants();
  const participantsCount = participants.length - 1;

  const isLive = !!participant;
  const hostAsViewer = `host-${hostUser.id}`;

  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 items-start justify-between p-4">
      <div className="flex items-start gap-x-3">
        <UserAvatar
          user={hostUser}
          isLive={isLive}
          size={"lg"}
          showBadge={true}
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-semibold text-lg">{hostUser.username}</p>
            <CheckMark />
          </div>
          <p className="text-base text-muted-foreground">{streamName}</p>
          {isLive ? (
            <div className="text-rose-500 text-sm flex items-center gap-x-2">
              <UserIcon className="w-4 h-4" />
              <p>
                {participantsCount}{" "}
                {participantsCount <= 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Offline</div>
          )}
        </div>
      </div>
      <Action
        isHost={isHost}
        hostIdentity={hostUser.id}
        isFollowing={isFollowing}
      />
    </div>
  );
};

VideoHeader.Skeleton = function VideoHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 items-start justify-between p-4">
      <div className="flex items-start gap-x-3">
        <UserAvatar size={"lg"} />
        <div className="space-y-3">
          <div className="flex items-center gap-x-2">
            <Skeleton className="w-[100px] h-3" />
          </div>
          <Skeleton className="w-[60px] h-3" />
          <Skeleton className="w-[60px] h-3" />
        </div>
      </div>
      <Action.Skeleton />
    </div>
  );
};

export default VideoHeader;
