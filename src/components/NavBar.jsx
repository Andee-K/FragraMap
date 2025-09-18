import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom"; // should be react-router-dom
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <>
      {/* Top Navbar */}
      <header className="w-full p-6 md:px-10 max-break-w:px-0 bg-primary-900 text-white">
        <div className="max-w-[1440px] flex justify-between items-center m-auto">
          <Link to="/dashboard"><span className="text-2xl font-bold">FragraMap</span></Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard/profile">Profile</Link>
            <Link to="/dashboard/settings">Settings</Link>
            <Button>Logout</Button>
          </nav>
          <div className="md:hidden">
            <MenuIcon
              onClick={() => setOpen(true)}
              fontSize="large"
              className="cursor-pointer"
            />
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />

          {/* Sidebar */}
          <div
            className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg p-6 rounded-l-xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()} // prevent overlay close
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-700"
            >
              <CloseIcon fontSize="large" />
            </button>

            {/* Nav links */}
            <div className="flex flex-col gap-4 mt-12">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/dashboard/profile">Profile</Link>
              <Link to="/dashboard/settings">Settings</Link>
            </div>

            {/* Logout at bottom */}
            <Button onClick={logout} className="w-full">
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
