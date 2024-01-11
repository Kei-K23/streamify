"use client";

import { cn } from "@/lib/utils";
import { useDashboardSidebarStore } from "@/store/use-dashboard-sidebar";
import React from "react";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
  const { collapsed } = useDashboardSidebarStore();
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
};

export default SidebarWrapper;
