import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center mb-4">
      <div className="relative w-[100px] h-[100px]">
        <Image fill src={"/duck.png"} alt="icon img" />
      </div>
      <span className="text-center text-lg md:text-2xl font-bold">
        Streamify
      </span>
      <span className="text-muted-foreground">Let&apos;s stream</span>
    </div>
  );
};

export default Logo;
