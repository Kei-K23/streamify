"use client";
import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardSidebarStore } from "@/store/use-dashboard-sidebar";
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from "lucide-react";
import React from "react";

const SidebarToggle = () => {
  const { collapsed, onCollapsed, onExpand } = useDashboardSidebarStore();
  const label = !collapsed ? "Collapsed" : "Expand";

  return (
    <div className="px-5 py-4">
      {collapsed && (
        <div className="hidden lg:flex justify-center items-center">
          <ActionTooltip title={label} side="right">
            <Button size={"icon"} variant={"ghost"} onClick={onCollapsed}>
              <ArrowRightFromLineIcon className="w-4 h-4" />
            </Button>
          </ActionTooltip>
        </div>
      )}
      {!collapsed && (
        <div className="w-full flex justify-between items-center">
          <p className="text-base font-bold">Dashboard</p>
          <ActionTooltip title={label} side="right">
            <Button size={"icon"} variant={"ghost"} onClick={onExpand}>
              <ArrowLeftFromLineIcon className="w-4 h-4" />
            </Button>
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};

SidebarToggle.Skeleton = function SidebarToggleSkeleton() {
  return (
    <div className="px-5 py-4">
      <div className="flex justify-between items-center gap-x-4">
        <Skeleton className="h-[32px] flex-1" />
        <Skeleton className="h-[32px] w-[70px]" />
      </div>
    </div>
  );
};

export default SidebarToggle;
