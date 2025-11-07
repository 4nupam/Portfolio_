import React, { useState } from "react";
import {
  HomeIcon,
  FolderIcon,
  LightBulbIcon,
  UserIcon,
  BriefcaseIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

import Home from "./Home";
import Projects from "./Projects";
import Skills from "./Skills";
import About from "./About";
import Experience from "./Experience";
import Contact from "./Contact";

const navData = [
  { name: "Home", icon: HomeIcon, component: Home },
  { name: "Projects", icon: FolderIcon, component: Projects },
  { name: "Skills", icon: LightBulbIcon, component: Skills },
  { name: "About", icon: UserIcon, component: About },
  { name: "Experience", icon: BriefcaseIcon, component: Experience },
  { name: "Contact", icon: EnvelopeIcon, component: Contact },
];

const Navbar = () => {
  const [active, setActive] = useState("Home");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500 ease-in-out">
      {/* Animated Tab Navigation */}
      <nav className="fixed z-50 left-1/2 transform -translate-x-1/2 w-[90%] md:w-1/2 bottom-4 md:top-6 md:bottom-auto bg-white dark:bg-gray-800 shadow-xl rounded-full border border-gray-200 dark:border-gray-700 backdrop-blur-md transition-all duration-500">
        <ul className="flex justify-around md:justify-center md:gap-6 py-3 px-4">
          {navData.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <li
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`group flex flex-col items-center cursor-pointer px-3 py-1 transition-all duration-300 ease-in-out ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-indigo-400"
                }`}
              >
                <Icon
                  className={`h-5 w-5 mb-1 transition-transform duration-300 ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                />
                <span className="text-xs font-medium">{item.name}</span>
                {isActive && (
                  <div className="mt-1 h-1 w-6 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pulse" />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Animated Content Section */}
      <main className="grow pt-24 pb-28 md:pt-32 md:pb-10 transition-all duration-500 ease-in-out">
        {navData.map((item) => {
          const Component = item.component;
          return active === item.name ? (
            <section key={item.name} className="animate-fade-in px-4 md:px-8">
              <Component />
            </section>
          ) : null;
        })}
      </main>
    </div>
  );
};

export default Navbar;
