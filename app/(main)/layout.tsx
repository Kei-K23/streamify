import React from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import MainSidebarWrapper from "./_components/wrapper";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-[70px] flex h-full">
        <Sidebar />
        <MainSidebarWrapper>{children}</MainSidebarWrapper>
      </div>
    </div>
  );
};

export default MainLayout;
