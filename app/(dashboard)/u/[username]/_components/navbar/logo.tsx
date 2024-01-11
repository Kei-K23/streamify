import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="h-full flex gap-x-2 items-center justify-center "
    >
      <div className="relative w-[35px] h-[35px]">
        <Image fill src={"/duck.png"} alt="icon img" />
      </div>
      <div className="hidden h-full md:flex flex-col items-start justify-center">
        <span className="text-center text-[14px] md:text-base font-bold">
          Streamify
        </span>
        <span className="text-xs text-muted-foreground">Creator Dashboard</span>
      </div>
    </Link>
  );
};

export default Logo;
