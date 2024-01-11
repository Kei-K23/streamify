import { isFollowingUser } from "@/services/follow-service";
import { getUserByUsername } from "@/services/user-service";
import { notFound } from "next/navigation";
import React from "react";
import Actions from "./_components/actions";
import { isBlockUser } from "@/services/block-service";

interface UsernamePageProps {
  params: {
    username: string;
  };
}

const UsernamePage = async ({ params }: UsernamePageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockUser(user.id);

  if (isBlocking) {
    notFound();
  }

  return (
    <div>
      <h2>user name: {user.username}</h2>
      <h2>user id: {user.id}</h2>
      <h2>isFollowing : {`${isFollowing}`}</h2>
      <h2>isBlocking : {`${!isBlocking}`}</h2>
      <Actions
        userId={user.id}
        isFollowing={isFollowing}
        isBlocking={isBlocking}
      />
    </div>
  );
};

export default UsernamePage;
