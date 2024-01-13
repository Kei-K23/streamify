"use client";
import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import React, { ElementRef, useRef } from "react";

interface LiveVideoProps {
  participant: Participant;
}

const LiveVideo = ({ participant }: LiveVideoProps) => {
  const wrapperRef = useRef<ElementRef<"div">>(null);
  const videRef = useRef<ElementRef<"video">>(null);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videRef?.current) {
        track.publication.track?.attach(videRef?.current);
      }
    });

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videRef} width={"100%"} />
    </div>
  );
};

export default LiveVideo;
