import { isFollowingUser } from "@/services/follow-service";
import { getUserByUsername } from "@/services/user-service";
import { notFound } from "next/navigation";
import React from "react";
import Actions from "./_components/actions";
import { isBlockUser } from "@/services/block-service";
import StreamPlayer from "@/components/stream-player";

interface UsernamePageProps {
  params: {
    username: string;
  };
}

const UsernamePage = async ({ params }: UsernamePageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockUser(user.id);

  if (isBlocking) {
    notFound();
  }

  return (
    <div className="h-full w-full">
      <StreamPlayer
        followersCount={user.followings.length}
        user={user}
        stream={user.stream}
        isFollowing={isFollowing}
      />
    </div>
  );
};

export default UsernamePage;
