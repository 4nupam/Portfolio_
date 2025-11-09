import React from "react";
import {
  EnvelopeIcon,
  ArrowDownTrayIcon,
  SunIcon,
  MoonIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

const Home = () => {
  

  // Mouse-based parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, window.innerHeight], [10, -10]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);

  const springX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center h-screen px-6 text-center  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-700 overflow-hidden"
    >
     

      {/* Floating Light Orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4  h-[400px] blur-[160px] rounded-full"
        animate={{
          y: [0, 40, 0],
          x: [0, 20, 0],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4  bg-purple-500/20 blur-[120px] rounded-full"
        animate={{
          y: [0, -30, 0],
          x: [0, -20, 0],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Developer Illustration with Parallax Tilt */}
    

      {/* Intro Text */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 drop-shadow-lg"
      >
        Hi, I’m <span className="text-indigo-600 dark:text-indigo-400">Anupam</span> 
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-3 text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200"
      >
        Frontend Developer 
        {/* <span className="text-indigo-600 dark:text-indigo-400">Devnexus</span> */}
      </motion.p>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
      >
        Building <strong>interactive</strong> & <strong>scalable</strong> web
        apps with a focus on <em>design precision</em>, <em>performance</em>, and
        seamless user experience.
      </motion.p>

      {/* Skill Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex flex-wrap justify-center gap-3 text-sm md:text-base"
      >
        {[
          "React.js",
          "Next.js",
          "TypeScript",
          "Zustand",
          "Tailwind CSS",
          "Framer Motion",
        ].map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 border border-indigo-100 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition"
          >
            {skill}
          </span>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
      
        <a
          href="/resume.pdf"
          className="flex items-center gap-2 px-7 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-800 transition-transform hover:scale-105"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Resume
        </a>
      </motion.div>

      {/* Social Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 flex gap-6 text-indigo-600 dark:text-indigo-400"
      >
        {[
          {
            href: "mailto:dev.anupamupadhyay@gmail.com",
            icon: <EnvelopeIcon className="h-6 w-6" />,
            title: "Email",
          },
          {
            href: "https://www.linkedin.com/in/anupam-upadhyay-504a1b208/",
            icon: <FaLinkedin className="h-6 w-6" />,
            title: "LinkedIn",
          },
          {
            href: "https://github.com/4nupam",
            icon: <FaGithub className="h-6 w-6" />,
            title: "GitHub",
          },
          {
            href: "https://www.linkedin.com/in/anupam-upadhyay-504a1b208/",
            icon: <FaGlobe className="h-6 w-6" />,
            title: "Portfolio",
          },
        ].map(({ href, icon, title }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform hover:text-purple-200"
            title={title}
          >
            {icon}
          </a>
        ))}
      </motion.div>
    </section>
  );
};

export default Home;
