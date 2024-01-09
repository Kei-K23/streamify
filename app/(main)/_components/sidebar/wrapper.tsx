"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/use-sidebar";
import React from "react";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
  const { collapsed } = useSidebarStore();
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col h-full bg-zinc-800 w-60 z-[41]",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};

export default SidebarWrapper;
