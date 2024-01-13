import React from "react";
import { Skeleton } from "../ui/skeleton";
import ChatToggle from "./chat-toggle";
import VariantToggle from "./variant-toggle";

const Header = () => {
  return (
    <div className="relative p-3 border-b">
      <div className="absolute top-2 left-3 hidden lg:block">
        <ChatToggle />
      </div>
      <p className="font-semibold text-center">Stream Chat</p>
      <div className="absolute top-2 right-3  lg:block">
        <VariantToggle />
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="relative p-3 border-b">
      <Skeleton className="absolute top-2 left-3 hidden lg:block h-6 w-6" />
      <Skeleton className="w-24 h-6 mx-auto" />
      <Skeleton className="absolute top-2 right-3 h-6 w-6" />
    </div>
  );
};

export default Header;
