"use client";
import { useSidebarStore } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import LiveBadge from "@/components/live-badge";
import { Skeleton } from "@/components/ui/skeleton";

interface UserItemProps {
  user: User;
  showBadge?: boolean;
  isLive?: boolean;
}

const UserItem = ({ user, showBadge, isLive }: UserItemProps) => {
  const pathname = usePathname();
  const { collapsed } = useSidebarStore();
  const href = `/${user.username}`;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "w-full h-[48px]",
        isActive && "bg-accent",
        collapsed ? "justify-center" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex items-center w-full gap-x-2",
          collapsed && "justify-center"
        )}
      >
        <UserAvatar user={user} isLive={isLive} showBadge={showBadge} />
        {!collapsed && <p>{user.username}</p>}
      </div>
      {!collapsed && isLive && <LiveBadge className="ml-auto" />}
    </Link>
  );
};

UserItem.Skeleton = function UserItemSkeleton() {
  const { collapsed } = useSidebarStore();
  return (
    <div className="w-full h-[48px] flex gap-x-2 items-center">
      {!collapsed && (
        <div className="flex-1">
          <Skeleton className="h-[32px] w-full" />
        </div>
      )}
    </div>
  );
};

export default UserItem;
