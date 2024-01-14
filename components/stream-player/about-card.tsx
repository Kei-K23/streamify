import { User } from "@prisma/client";
import React from "react";
import CheckMark from "./check-mark";
import AboutModal from "./about-modal";
import { Skeleton } from "../ui/skeleton";

interface AboutCardProps {
  hostUser: User;
  viewerIdentity: string;
  followersCount: number;
}

const AboutCard = ({
  hostUser,
  viewerIdentity,
  followersCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostUser.id}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followersCountLabel = followersCount <= 1 ? "Follower" : "Followers";

  return (
    <div className="p-4">
      <div className="bg-zinc-800 p-4 rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <h2 className="text-base md:text-lg font-bold mb-1">
              About&apos; {hostUser.username}
            </h2>
            <CheckMark />
          </div>
          {isHost && <AboutModal initialBio={hostUser.bio} />}
        </div>
        <p className="text-muted-foreground">
          <span className="text-primary font-bold">{followersCount}</span>{" "}
          {followersCountLabel}
        </p>
        <p className="text-base text-muted-foreground font-semibold mt-3">
          {hostUser?.bio
            ? hostUser.bio
            : "This user is prefer to hide the Bio."}
        </p>
      </div>
    </div>
  );
};

AboutCard.Skeleton = function AboutCardSkeleton() {
  return (
    <div className="p-4">
      <div className="bg-zinc-800 p-4 rounded-md space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <Skeleton className="w-[150px] h-3.5" />
          </div>
        </div>
        <Skeleton className="w-[100px] h-3.5" />
        <Skeleton className="w-[300px] h-[100px]" />
      </div>
    </div>
  );
};

export default AboutCard;
