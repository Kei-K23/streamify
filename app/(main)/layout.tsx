import React, { Suspense } from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import MainSidebarWrapper from "./_components/wrapper";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-[70px] flex h-full">
        <Suspense fallback={<Sidebar.Skeleton />}>
          <Sidebar />
        </Suspense>
        <MainSidebarWrapper>{children}</MainSidebarWrapper>
      </div>
    </div>
  );
};

export default MainLayout;
