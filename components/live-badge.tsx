import { cn } from "@/lib/utils";
import React from "react";

interface LiveBadgeProps {
  className?: string;
}

const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div
      className={cn(
        className,
        "border border-background bg-rose-500 p-0.5 px-1.5 tracking-wide text-[10px] font-bold uppercase rounded-sm"
      )}
    >
      Live
    </div>
  );
};

export default LiveBadge;
