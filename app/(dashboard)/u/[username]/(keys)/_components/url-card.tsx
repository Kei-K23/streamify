"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import CopyBtn from "./copy-btn";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface UrlsCardProps {
  label: string;
  value?: string | null;
  showValue?: boolean;
}

const UrlsCard = ({ label, value, showValue = true }: UrlsCardProps) => {
  const [isShowValue, setIsShowValue] = useState(showValue);

  return (
    <div className="w-full rounded-md bg-zinc-800 px-4 md:px-8 py-3 md:py-4 flex justify-between items-start gap-x-6">
      <p className="text-base md:text-lg">{label}</p>
      <div className="flex-1 flex justify-center gap-x-4">
        <div className="w-full">
          <Input
            type={isShowValue ? "text" : "password"}
            disabled
            value={value || "asjfkasjfl"}
            placeholder={label}
          />
          <Button variant={"link"} onClick={() => setIsShowValue(!isShowValue)}>
            {isShowValue ? "Hide" : "Show"}
          </Button>
        </div>
        <CopyBtn value={value} />
      </div>
    </div>
  );
};

UrlsCard.Skeleton = function UrlsCardSkeleton() {
  return <Skeleton className="w-full rounded-md h-[40px]" />;
};

export default UrlsCard;
