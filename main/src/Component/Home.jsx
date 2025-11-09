import React from "react";
import {
  EnvelopeIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

const Home = () => {
  // 🌀 Parallax rotation based on mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, window.innerHeight], [15, -15]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
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
      className="relative flex flex-col items-center justify-center h-screen px-6 text-center overflow-hidden
                 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
                 transition-all duration-700"
    >
      {/* 🌈 Animated floating linear lights */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-indigo-500/20 blur-[150px] rounded-full"
        animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-pink-500/20 blur-[160px] rounded-full"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      {/* 💫 Name and Role */}
      <motion.div
        style={{ rotateX: springX, rotateY: springY }}
        className="z-10 flex flex-col items-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text
                     bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600
                     dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400"
        >
          Hi, I’m <span className="text-indigo-600 dark:text-indigo-400">Anupam</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-3 text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100"
        >
          Frontend Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed"
        >
          Crafting <strong>interactive</strong>, <strong>scalable</strong> web
          experiences with <em>performance</em>, <em>precision</em>, and a touch of
          creativity — even if I’m still learning UI design 😅
        </motion.p>
      </motion.div>

      {/* 🧠 Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex flex-wrap justify-center gap-3 text-sm md:text-base"
      >
        {[
          "React.js",
          "Next.js",
          "JavaScript",
          "Redux",
          "Zustand",
          "Tailwind CSS",
          "Framer Motion",
        ].map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-white/80 dark:bg-gray-800/70 border border-indigo-100 
                       dark:border-gray-700 rounded-full shadow-sm hover:shadow-md hover:scale-105 
                       transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </motion.div>

      {/* ⚙️ CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        <a
          href="/resume.pdf"
          className="flex items-center gap-2 px-7 py-3 rounded-xl border border-indigo-600 
                     text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 
                     transition-transform hover:scale-105 shadow-sm"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Resume
        </a>
      </motion.div>

      {/* 🌐 Social Links */}
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
            href: "https://4nupam.github.io/",
            icon: <FaGlobe className="h-6 w-6" />,
            title: "Portfolio",
          },
        ].map(({ href, icon, title }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            className="hover:scale-125 transition-transform hover:text-pink-400"
          >
            {icon}
          </a>
        ))}
      </motion.div>
    </section>
  );
};

export default Home;
