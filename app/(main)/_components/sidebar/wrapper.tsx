"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/use-sidebar";
import React from "react";
import { useIsClient } from "usehooks-ts";
import Recommended from "./recommended";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
  const { collapsed } = useSidebarStore();
  const isClient = useIsClient();
  if (!isClient) {
    return (
      <aside
        className={cn(
          "fixed left-0 flex flex-col h-full bg-zinc-800 w-[70px] lg:w-60 z-[41]",
          collapsed && "lg:w-[70px]"
        )}
      >
        <Recommended.Skeleton />
      </aside>
    );
  } else {
    return (
      <aside
        className={cn(
          "fixed left-0 flex flex-col h-full bg-zinc-800 w-[70px] lg:w-60 z-[41]",
          collapsed && "lg:w-[70px]"
        )}
      >
        {children}
      </aside>
    );
  }
};

export default SidebarWrapper;
