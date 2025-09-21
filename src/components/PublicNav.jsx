import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { motion, AnimatePresence } from "framer-motion";

const PublicNavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}   // start hidden + slightly above
        animate={{ opacity: 1, y: 0 }}      // fade + slide into place
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full p-8 sm:px-12 md:px-24 bg-primary-900 text-white z-10 shadow-md"
      >
        <div className="flex justify-between items-center m-auto max-w-[1280px]">
          <Link
            to="/"
            className="text-2xl font-bold hover:scale-103 hover:cursor-pointer transition"
          >
            FragraMap
          </Link>

          {/* Desktop Links */}
          <nav className="hidden font-semibold md:flex items-center space-x-6">
            <Link
              to="/register"
              className="hover:scale-103 hover:cursor-pointer transition"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="flex gap-2 hover:scale-103 hover:cursor-pointer transition"
            >
              Login
              <LoginRoundedIcon />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MenuIcon
              onClick={() => setOpen(true)}
              fontSize="large"
              className="cursor-pointer"
            />
          </div>
        </div>
      </motion.header>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 bg-black/40"
              onClick={() => setOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed top-0 right-0 w-72 h-full bg-neutral-cool-200 shadow-lg p-6 rounded-l-xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-primary-900 hover:scale-103 transition hover:text-primary-800 hover:cursor-pointer"
              >
                <CloseIcon fontSize="large" />
              </button>

              {/* Nav Links */}
              <div className="flex flex-col gap-4 mt-10 p-4 font-semibold text-lg">
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  Register
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PublicNavBar;
