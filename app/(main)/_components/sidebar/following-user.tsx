"use client";

import { useSidebarStore } from "@/store/use-sidebar";
import React from "react";
import UserItem from "./user-item";
import { Follow, Stream, User } from "@prisma/client";

interface FollowingUserProps {
  data: (Follow & { following: User & { stream: Stream | null } })[];
}

const FollowingUser = ({ data }: FollowingUserProps) => {
  const { collapsed } = useSidebarStore();

  if (!data.length) {
    return null;
  }
  return (
    <div>
      {!collapsed && (
        <div className="px-5">
          <p className="text-[14px] text-muted-foreground font-bold">
            Following
          </p>
        </div>
      )}
      <div className="space-y-4 mt-2">
        {data &&
          data.map((user) => (
            <UserItem
              key={user.following.id}
              user={user.following}
              isLive={user.following.stream?.isLive}
            />
          ))}
      </div>
    </div>
  );
};

export default FollowingUser;
