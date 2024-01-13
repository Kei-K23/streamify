import StreamPlayer from "@/components/stream-player";
import { currentUser } from "@/lib/current-user";
import { getUserByUsername } from "@/services/user-service";
import React from "react";

const CreateHomePage = async ({ params }: { params: { username: string } }) => {
  const clerkUser = await currentUser();
  const user = await getUserByUsername(clerkUser.username);

  if (
    clerkUser.externalUserId !== user?.externalUserId ||
    !user ||
    !user?.stream
  ) {
    throw new Error("Unauthorized user!");
  }
  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
    </div>
  );
};

export default CreateHomePage;
