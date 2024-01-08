import React from "react";
import Logo from "./logo";
import NavbarSearchBar from "./nvabar-searchBar";
import Actions from "./actions";

const Navbar = () => {
  return (
    <header className="h-[70px] fixed top-0 bg-zinc-800 w-full z-[40]">
      <nav className="h-full gap-x-4 flex items-center justify-between px-4 sm:px-6 md:px-14">
        <Logo />
        <div className="flex-1 flex items-center justify-end gap-x-1 md:gap-x-4 ">
          <NavbarSearchBar />
          <Actions />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
