"use client";
import { useUser } from "@clerk/nextjs";
import { Cog, KeySquare, Users2Icon, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import NavigationItem from "./navigation-item";

const Navigation = () => {
  const { user } = useUser();
  const pathname = usePathname();

  const navigation = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: VideoIcon,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeySquare,
    },
    {
      label: "Setting",
      href: `/u/${user?.username}/setting`,
      icon: Cog,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users2Icon,
    },
  ];

  return (
    <div className="mt-2">
      {navigation.map((n) => (
        <NavigationItem data={n} key={n.label} isActive={pathname === n.href} />
      ))}
    </div>
  );
};

Navigation.Skeleton = function NavigationSkeleton() {
  return (
    <div className="space-y-3 mt-2">
      {[...Array(4)].map((_, i) => (
        <NavigationItem.Skeleton key={i} />
      ))}
    </div>
  );
};

export default Navigation;
