"use client";

import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { Track, ConnectionState } from "livekit-client";
import React from "react";

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
    content = <p>Host is offline</p>;
  } else if (!participant || tracks.length === 0) {
    content = <p>Loading...</p>;
  } else {
    content = <p>Is Live</p>;
  }

  return <div className="aspect-video border-b relative group">{content}</div>;
};

export default Video;
