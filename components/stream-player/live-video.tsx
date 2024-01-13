"use client";
import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import React, { ElementRef, useRef, useState } from "react";
import FullscreenControl from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";

interface LiveVideoProps {
  participant: Participant;
}

const LiveVideo = ({ participant }: LiveVideoProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wrapperRef = useRef<ElementRef<"div">>(null);
  const videRef = useRef<ElementRef<"video">>(null);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videRef?.current) {
        track.publication.track?.attach(videRef?.current);
      }
    });

  function onFullscreenToggle() {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
    }
  }

  function handleFullscreenChange() {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  }

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videRef} width={"100%"} />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="w-full h-12 absolute bottom-0 flex items-center justify-between bg-black/50 px-4">
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={onFullscreenToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
