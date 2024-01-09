import { User } from "@prisma/client";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import LiveBadge from "./live-badge";
import { Skeleton } from "./ui/skeleton";

const avatarSize = cva("", {
  variants: {
    size: {
      default: "w-8 h-8",
      lg: "w-4 h-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSize> {
  user: User;
  showBadge?: boolean;
  isLive?: boolean;
}

const UserAvatar = ({ user, isLive, showBadge, ...props }: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSize({ size: props.size })
        )}
      >
        <AvatarImage src={user.imageUrl!} className="object-cover" />
        <AvatarFallback>{user.username}</AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSize> {}

UserAvatar.Skeleton = function UserAvatarSkeleton({
  size,
}: UserAvatarSkeletonProps) {
  return (
    <Skeleton className={cn(avatarSize({ size }), "rounded-full")}></Skeleton>
  );
};

export default UserAvatar;
