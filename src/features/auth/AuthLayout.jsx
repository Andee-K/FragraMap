import React, { useState } from "react";
import { Link } from "react-router-dom";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { motion } from "framer-motion";

function AuthLayout({
  title,
  subtitle,
  linkText,
  linkPath,
  onSubmit,
  buttonText,
  showNameField = false,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (showNameField) {
        await onSubmit(name, email, password);
      } else {
        await onSubmit(email, password);
      }
    } catch (err) {
      const errorMsg = err.message.split(" ").splice(1).join(" ");
      setError(errorMsg);
      console.error("Auth error:", errorMsg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-cool-300">
      {/* FragraMap Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8, ease: "easeIn" }}
        className="flex items-center gap-3 text-3xl font-bold mb-6 text-primary-900 hover:text-primary-800 hover:scale-102 transition hover:cursor-pointer"
      >
        <Link to="/">
          FragraMap
        </Link>
      </motion.h1>

      {/* Login/Sign Up Card */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8, ease: "easeIn" }}
        className="w-full max-w-md bg-neutral-cool-100 shadow-lg rounded-xl p-12"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-neutral-cool-900 mb-2">
            {title}
          </h2>
          <p className="mt-2 text-lg font-medium text-neutral-cool-700">
            {subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {showNameField && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-cool-700"
              >
                Full Name
              </label>
              <div className="relative mt-1 flex items-center w-full">
                <BadgeRoundedIcon className="absolute left-3 text-neutral-cool-600" />
                <input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 pl-12 border border-primary-200 rounded-lg shadow-sm hover:cursor-pointer hover:bg-neutral-cool-200 focus:bg-neutral-cool-200 focus:ring-primary-900"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-cool-700"
            >
              Email
            </label>
            <div className="relative mt-1 flex items-center w-full">
              <MailRoundedIcon className="absolute left-3 text-neutral-cool-600" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 pl-12 border border-primary-200 rounded-lg shadow-sm hover:cursor-pointer hover:bg-neutral-cool-200 focus:bg-neutral-cool-200 focus:ring-primary-900"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-cool-700"
            >
              Password
            </label>
            <div className="relative mt-1 flex items-center w-full">
              <LockRoundedIcon className="absolute left-3 text-neutral-cool-600" />
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pl-12 border border-primary-200 rounded-lg shadow-sm hover:cursor-pointer hover:bg-neutral-cool-200 focus:bg-neutral-cool-200 focus:ring-primary-900"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <button className="flex justify-center items-center mt-6 text-md w-full text-primary-50 text-nowrap font-semibold px-4 py-3 bg-primary-900 rounded-md shadow-md hover:bg-primary-950 hover:shadow-none hover:cursor-pointer hover:scale-103 transition-transform">
            {buttonText}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {linkText}{" "}
            <Link
              to={linkPath}
              className="text-primary-600 font-medium hover:underline"
            >
              {title.includes("Register") ? "Login here" : "Register here"}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthLayout;
