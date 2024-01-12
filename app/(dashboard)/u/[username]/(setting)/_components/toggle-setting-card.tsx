"use client";

import { updateStream } from "@/actions/stream-action";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface ToggleSettingCardProps {
  label: string;
  field: "isChatEnable" | "isDelayChat" | "isChatFollowerOnly";
  value: boolean;
}

const ToggleSettingCard = ({ label, field, value }: ToggleSettingCardProps) => {
  const [isPending, startTransition] = useTransition();

  function onChange() {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success("Updated stream setting!"))
        .catch(() => toast.error("Something went wrong!"));
    });
  }

  return (
    <div className="w-full rounded-md bg-zinc-800 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center gap-x-3">
      <p className="text-base md:text-lg">{label}</p>
      <Switch disabled={isPending} onCheckedChange={onChange} checked={value}>
        {value ? "On" : "Off"}
      </Switch>
    </div>
  );
};

ToggleSettingCard.Skeleton = function ToggleSettingCardSkeleton() {
  return <Skeleton className="w-full rounded-md h-[40px]" />;
};

export default ToggleSettingCard;
