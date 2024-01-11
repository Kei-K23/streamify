"use client";

import { cn } from "@/lib/utils";
import { useDashboardSidebarStore } from "@/store/use-dashboard-sidebar";
import React, { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface MainSidebarWrapperProps {
  children: React.ReactNode;
}

const MainSidebarWrapper = ({ children }: MainSidebarWrapperProps) => {
  const { collapsed, onCollapsed, onExpand } = useDashboardSidebarStore();
  const matches = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (matches) {
      onCollapsed();
    } else {
      onExpand();
    }
  }, [matches, onCollapsed, onExpand]);
  return (
    <div className={cn(collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>
      {children}
    </div>
  );
};

export default MainSidebarWrapper;
