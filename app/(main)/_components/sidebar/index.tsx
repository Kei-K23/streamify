import React from "react";
import SidebarWrapper from "./wrapper";
import SidebarToggle from "./toggle";
import Recommended from "./recommended";
import { getRecommended } from "@/lib/get-recommended";

const Sidebar = async () => {
  const users = await getRecommended();

  return (
    <SidebarWrapper>
      <SidebarToggle />
      <Recommended data={users} />
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
