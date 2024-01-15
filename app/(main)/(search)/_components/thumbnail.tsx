import LiveBadge from "@/components/live-badge";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface ThumbnailProps {
  src: string | null;
  isLive: boolean;
  user: User;
}

const Thumbnail = ({ src, isLive, user }: ThumbnailProps) => {
  let content;

  if (!src) {
    content = (
      <div className="bg-zinc-800 border w-full h-full rounded-lg flex flex-col items-center justify-center transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 gap-y-4">
        <UserAvatar user={user} showBadge={true} size={"lg"} />
      </div>
    );
  } else {
    content = (
      <Image
        fill
        src={src}
        alt="thumbnail"
        className="bg-zinc-800 object-cover border w-full h-full rounded-lg transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 gap-y-4"
      />
    );
  }

  return (
    <div className="group aspect-video relative rounded-lg cursor-pointer">
      <div className="rounded-lg absolute inset-0 opacity-0 bg-yellow-200 group-hover:opacity-100 transition-all"></div>
      {content}
      {isLive && (
        <div className="absolute top-3 left-3">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

Thumbnail.Skeleton = function ThumbnailSkeleton() {
  return (
    <div className="aspect-video relative rounded-lg cursor-pointer">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default Thumbnail;
