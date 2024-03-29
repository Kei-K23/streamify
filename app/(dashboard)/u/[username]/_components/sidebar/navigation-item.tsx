"use client";

import ActionTooltip from "@/components/action-tooltip";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useDashboardSidebarStore } from "@/store/use-dashboard-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
interface NavigationItemProps {
  data: {
    label: string;
    href: string;
    icon: LucideIcon;
  };
  isActive: boolean;
}

const NavigationItem = ({ data, isActive }: NavigationItemProps) => {
  const { collapsed } = useDashboardSidebarStore();
  const ICON = data.icon;

  return (
    <Link
      href={data.href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "w-full h-[48px]",
        isActive && "bg-accent",
        collapsed ? "justify-center" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex items-center w-full gap-x-2",
          collapsed && "justify-center"
        )}
      >
        {!collapsed ? (
          <>
            <ICON className="w-5 h-5" />
          </>
        ) : (
          <ActionTooltip title={data.label} side="right">
            <ICON className="w-5 h-5" />
          </ActionTooltip>
        )}
        {!collapsed && <p>{data.label}</p>}
      </div>
    </Link>
  );
};

NavigationItem.Skeleton = function NavigationItemSkeleton() {
  return (
    <div className="w-full h-[48px] flex gap-x-2 items-center ">
      <>
        <Skeleton className="h-[32px] w-[32px] mx-auto" />
        <div className="hidden lg:block flex-1">
          <Skeleton className="h-[32px] w-full" />
        </div>
      </>
    </div>
  );
};

export default NavigationItem;
