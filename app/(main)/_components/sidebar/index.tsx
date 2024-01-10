import React from "react";
import SidebarWrapper from "./wrapper";
import SidebarToggle from "./toggle";
import Recommended from "./recommended";
import { getRecommended } from "@/lib/get-recommended";
import { getAllFollowingUsers } from "@/services/follow-service";
import FollowingUser from "./following-user";

const Sidebar = async () => {
  const users = await getRecommended();

  const followingUsers = await getAllFollowingUsers();

  return (
    <SidebarWrapper>
      <SidebarToggle />
      <div className="space-y-4">
        <FollowingUser data={followingUsers} />
        <Recommended data={users} />
      </div>
    </SidebarWrapper>
  );
};

Sidebar.Skeleton = function sidebarSkeleton() {
  return (
    <aside
      className={"fixed left-0 flex flex-col h-full bg-zinc-800 w-60 z-[41]"}
    >
      <Recommended.Skeleton />
    </aside>
  );
};

export default Sidebar;
