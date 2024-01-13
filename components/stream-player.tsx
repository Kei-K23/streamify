"use client";

import { Stream, User } from "@prisma/client";
import React from "react";

interface StreamPlayerProps {
  user: User;
  stream: Stream;
  isFollowing: boolean;
}

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  return <div>Stream Player</div>;
};

export default StreamPlayer;
