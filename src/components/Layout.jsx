import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="max-w-[1440px] m-auto p-5 sm:p-8 max-break-w:px-0">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Layout;
