import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion, useMotionValue } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase.from("techStack").select("*");
        if (error) throw error;
        setSkills(data || []);
      } catch (err) {
        console.error("Error fetching skills:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = e.clientX - innerWidth / 2;
    const y = e.clientY - innerHeight / 2;
    mouseX.set(x);
    mouseY.set(y);
  };
if (loading)
    return (
      <div className="flex h-64 items-center justify-center text-lg font-medium text-indigo-600">
     Supabase is waking up...
      </div>
    );
  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center  dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-16 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        My Tech Stack
      </motion.h2>

      {loading ? (
        <p className="text-lg text-gray-500 dark:text-gray-400">Loading...</p>
      ) : (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-5xl px-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id || index}
              style={{
                x: mouseX.get() * ((index % 3) / 60),
                y: mouseY.get() * ((index % 5) / 60),
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.1,
                y: -5,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="flex items-center justify-center py-4 px-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 text-center font-semibold text-sm md:text-base transition-all"
            >
              {skill.techs}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;
