"use client";
import StreamPlayer from "@/components/stream-player";
import React from "react";

const CreatorPageLoading = () => {
  return (
    <div className="h-full">
      <StreamPlayer.Skeleton />
    </div>
  );
};

export default CreatorPageLoading;
