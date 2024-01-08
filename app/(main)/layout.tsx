import React from "react";
import Navbar from "./_components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-20 flex h-full">{children}</div>
    </div>
  );
};

export default MainLayout;
