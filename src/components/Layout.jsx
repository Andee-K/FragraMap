import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="max-w-[1280px] m-auto p-6 sm:p-8 max-break-w:px-0">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Layout;
