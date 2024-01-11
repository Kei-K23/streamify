import React from "react";
import Navbar from "./_components/navbar";

const CreatorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="pt-[70px] flex h-full">{children}</div>
    </>
  );
};

export default CreatorLayout;
