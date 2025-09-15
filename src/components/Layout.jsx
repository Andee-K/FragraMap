import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="max-w-[1440px] m-auto">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Layout;
