import React from "react";
import SidebarWrapper from "./wrapper";
import SidebarToggle from "./toggle";
import Navigation from "./navigation";

const Sidebar = async () => {
  return (
    <SidebarWrapper>
      <SidebarToggle />
      <div>
        <Navigation />
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
