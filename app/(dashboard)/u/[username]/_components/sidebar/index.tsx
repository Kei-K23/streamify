import React from "react";
import SidebarWrapper from "./wrapper";
import SidebarToggle from "./toggle";

const Sidebar = async () => {
  return (
    <SidebarWrapper>
      <SidebarToggle />
      <div className="space-y-4"></div>
    </SidebarWrapper>
  );
};

export default Sidebar;
