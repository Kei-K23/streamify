"use client";

import { useSidebarStore } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import React from "react";
import UserItem from "./user-item";

interface RecommendedProps {
  data: User[];
}

const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebarStore();

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="px-5">
          <p className="text-[14px] text-muted-foreground font-bold">
            Recommended
          </p>
        </div>
      )}
      <div className="space-y-4 mt-2">
        {data.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

Recommended.Skeleton = function recommendedSkeleton() {
  return (
    <div className="space-y-4 mt-2 px-5">
      {[...Array(5)].map((_, i) => (
        <UserItem.Skeleton key={i} />
      ))}
    </div>
  );
};

export default Recommended;
