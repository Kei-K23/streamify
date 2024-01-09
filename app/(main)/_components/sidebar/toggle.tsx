"use client";
import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store/use-sidebar";
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from "lucide-react";
import React from "react";

const SidebarToggle = () => {
  const { collapsed, onCollapsed, onExpand } = useSidebarStore();
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
          <p className="text-base font-bold">For you</p>
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

export default SidebarToggle;
