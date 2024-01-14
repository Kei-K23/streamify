"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/use-sidebar";
import React, { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface MainSidebarWrapperProps {
  children: React.ReactNode;
}

const MainSidebarWrapper = ({ children }: MainSidebarWrapperProps) => {
  const { collapsed, onCollapsed, onExpand } = useSidebarStore();
  const matches = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (matches) {
      onCollapsed();
    } else {
      onExpand();
    }
  }, [matches, onCollapsed, onExpand]);
  return (
    <div
      className={cn(
        "w-full h-full",
        collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
      )}
    >
      {children}
    </div>
  );
};

export default MainSidebarWrapper;
