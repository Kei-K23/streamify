"use client";

import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { Track, ConnectionState } from "livekit-client";
import React from "react";
import OfflineVideo from "./offline-video";
import LoadingVideo from "./loading-video";
import LiveVideo from "./live-video";
import { Skeleton } from "../ui/skeleton";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

const Video = ({ hostIdentity, hostName }: VideoProps) => {
  let content;
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  if (!participant && ConnectionState.Connected === connectionState) {
    content = <OfflineVideo username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return <div className="aspect-video border-b relative group">{content}</div>;
};

Video.Skeleton = function VideoSkeleton() {
  return (
    <div className="aspect-video border-b relative group">
      <Skeleton className="w-full h-full rounded-none" />
    </div>
  );
};

export default Video;
