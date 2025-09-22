import React from "react";
import { Link } from "react-router-dom";
import PublicNavBar from "../components/PublicNav";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { motion } from "framer-motion";

export default function Home() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      // Delay children
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <PublicNavBar />

      {/* Background Image and Overlay */}
      <div className="absolute inset-0">
        <img
          src="/fragramap-bg.jpg"
          alt="Background of a perfume bottle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-400/35" />
      </div>

      {/* Hero Content */}
      <main className="relative flex flex-1 items-center justify-start px-6 sm:px-12 lg:px-20 z-10">
        <div className="w-full max-w-[1280px] m-auto">
          <motion.section
            aria-labelledby="home-title"
            className="flex flex-col gap-5 max-w-2xl"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              id="home-title"
              variants={item}
              className="text-3xl font-extrabold text-primary-900 sm:text-4xl md:text-5xl"
            >
              Welcome to FragraMap!
            </motion.h1>

            <motion.h2
              variants={item}
              className="text-xl font-bold text-neutral-cool-900 sm:text-2xl md:text-3xl"
            >
              Uncover the fragrances that tell your unique story.
            </motion.h2>

            <motion.p
              variants={item}
              className="max-w-[30em] text-lg font-semibold text-neutral-cool-900/80 sm:text-xl"
            >
              Track your tests, compare your favorites, and discover your unique
              fragrance profile. FragraMap helps you find your signature scent.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-12 flex flex-wrap gap-4"
            >
              <Link
                to="/register"
                className="flex justify-center items-center text-nowrap text-md text-primary-50 font-semibold px-8 py-3 bg-primary-900 rounded-md shadow-md hover:bg-primary-950 hover:shadow-none hover:scale-103 transition-transform"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="flex justify-center items-center text-lg text-nowrap gap-2 text-primary-900 font-bold px-4 py-3 rounded-md hover:scale-103 transition-transform"
              >
                User Login
                <EastRoundedIcon />
              </Link>
            </motion.div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
