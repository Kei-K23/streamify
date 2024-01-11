import React from "react";
import Navbar from "./_components/navbar";
import MainSidebarWrapper from "./_components/wrapper";
import Sidebar from "./_components/sidebar";

const CreatorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="pt-[70px] flex h-full">
        <Sidebar />
        <MainSidebarWrapper>{children}</MainSidebarWrapper>
      </div>
    </>
  );
};

export default CreatorLayout;
