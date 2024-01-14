import { StreamWithUser } from "@/type";
import Link from "next/link";
import React from "react";
import Thumbnail from "./thumbnail";
import UserAvatar from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultCardProps {
  stream: StreamWithUser;
}

const ResultCard = ({ stream }: ResultCardProps) => {
  return (
    <Link href={`/${stream.user.username}`}>
      <div className="w-full h-full space-y-4">
        <Thumbnail
          src={stream.thumbnailImg}
          isLive={stream.isLive}
          user={stream.user}
        />
        <div className="flex items-start gap-x-4">
          <UserAvatar user={stream.user} isLive={stream.isLive} />
          <div>
            <h3>{stream.name}</h3>
            <h3 className="text-muted-foreground">{stream.user.username}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

ResultCard.Skeleton = function ResultCardSkelton() {
  return (
    <div className="w-full h-full space-y-4">
      <Thumbnail.Skeleton />
      <div className="flex items-start gap-x-4">
        <UserAvatar />
        <div className="space-y-4">
          <Skeleton className="w-[100px] h-5" />
          <Skeleton className="w-[80px] h-5" />
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
