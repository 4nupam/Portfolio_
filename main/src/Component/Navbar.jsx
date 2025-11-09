import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  FolderIcon,
  LightBulbIcon,
  BriefcaseIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

import Home from "./Home";
import Projects from "./Projects";
import Skills from "./Skills";
import Experience from "./Experience";
import Contact from "./Contact";

// Navigation data
const navData = [
  { name: "Home", icon: HomeIcon, component: Home },
  { name: "Projects", icon: FolderIcon, component: Projects },
  { name: "Skills", icon: LightBulbIcon, component: Skills },
  { name: "Experience", icon: BriefcaseIcon, component: Experience },
  { name: "Contact", icon: EnvelopeIcon, component: Contact },
];

// 🎨 Gradient backgrounds
const gradients = {
  Home: "from-indigo-500 via-purple-500 to-pink-500",
  Projects: "from-blue-500 via-cyan-500 to-green-400",
  Skills: "from-yellow-500 via-orange-500 to-red-500",
  Experience: "from-violet-500 via-indigo-500 to-blue-500",
  Contact: "from-pink-500 via-rose-500 to-red-500",
};

const Navbar = () => {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) setActive(savedTab);
  }, []);

  const handleTabClick = (name) => {
    setActive(name);
    localStorage.setItem("activeTab", name);
  };

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-all duration-700 ease-in-out">
      {/* 🌈 Gradient background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-linear-to-br ${gradients[active]} blur-[120px]`}
        />
      </AnimatePresence>

      {/* 🔹 Navigation Bar */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed z-50 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] md:w-2/3 lg:w-1/2 
                    ${active === "Contact" ? "bottom-4" : "bottom-6"}
                    md:top-6 md:bottom-auto
                    bg-white/80 dark:bg-gray-800/80 shadow-2xl rounded-full border border-gray-200 dark:border-gray-700 
                    backdrop-blur-xl transition-all duration-500`}
      >
        <ul className="flex justify-around md:justify-center md:gap-6 py-3 px-2 sm:px-4">
          {navData.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;

            return (
              <motion.li
                key={item.name}
                onClick={() => handleTabClick(item.name)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className={`group flex items-center gap-1.5 sm:gap-2 cursor-pointer px-2 sm:px-3 py-2 rounded-full select-none
                            transition-all duration-300 ease-in-out ${
                              isActive
                                ? "text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-400 shadow-md shadow-indigo-200 dark:shadow-indigo-800/40"
                                : "text-gray-500 dark:text-gray-400 hover:text-indigo-400"
                            }`}
              >
                {/* Icon (hidden on xs screens) */}
                <Icon
                  className={`h-5 w-5 transition-transform duration-300 hidden xs:inline ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                />
                {/* Label (visible on all, but responsive size) */}
                <div className="flex flex-col items-start">
                  <span className="text-[10px] sm:text-xs font-medium">
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="mt-1 h-1 w-6 sm:w-8 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                    />
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>

      {/* 🧩 Animated Content */}
      <main className="flex items-center justify-center grow min-w-full h-full">
        <AnimatePresence mode="wait">
          {navData.map((item) => {
            const Component = item.component;
            return (
              active === item.name && (
                <motion.section
                  key={item.name}
                  initial={{ opacity: 0, x: 80, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -80, scale: 0.98 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="w-full h-full flex items-center justify-center px-3 sm:px-6 md:px-10"
                >
                  <Component />
                </motion.section>
              )
            );
          })}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Navbar;
