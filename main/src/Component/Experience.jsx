import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

const Experience = () => {
  const [loading, setLoading] = useState(false);
  const [experience, setExperience] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchExper = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("Companies").select("*");
        if (error) throw error;
        setExperience(data || []);
      } catch (error) {
        console.error("Error fetching experience:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExper();
  }, []);

  // Popup
  const Popup = ({ data, onClose }) => {
    if (!data) return null;
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl overflow-y-auto max-h-[85vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
            >
              ✕
            </button>

            {data.image && (
              <div className="flex justify-center mb-4">
                <img
                  src={data.image}
                  alt={data.name}
                  className="h-20 w-20 object-cover rounded-full border border-indigo-100 shadow-md"
                />
              </div>
            )}

            <h3 className="text-xl font-semibold text-center text-gray-900">
              {data.name}
            </h3>
            {data.Duration && (
              <p className="text-sm text-center text-gray-500">
                {data.Duration}
              </p>
            )}
            <p className="mt-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {data.description}
            </p>

            {data.link && (
              <div className="mt-6 text-center">
                <a
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Visit Project
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Card
  const Card = ({ id, name, Duration, image }) => (
    <motion.div
      key={id}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="flex flex-col items-center justify-between rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300"
    >
      {image && (
        <img
          src={image}
          alt={name}
          className="h-16 w-16 mb-3 rounded-full object-cover border border-indigo-100"
        />
      )}
      <h3 className="text-base font-semibold text-gray-900 text-center">
        {name}
      </h3>
      {Duration && (
        <p className="mt-1 text-xs text-gray-500 text-center">{Duration}</p>
      )}
      <button
        onClick={() => setSelected(experience.find((exp) => exp.id === id))}
        className="mt-4 w-full rounded-md bg-indigo-600 py-2 text-xs text-white font-medium hover:bg-indigo-700 transition"
      >
        View Details
      </button>
    </motion.div>
  );

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center text-lg font-medium text-indigo-600">
        Loading your experience...
      </div>
    );

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <h2 className="text-2xl mt-3 font-bold tracking-tight text-slate-900 sm:text-4xl">
          Professional Experience
        </h2>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-3xl mx-auto">
          Building scalable <strong>web, desktop, and PWA</strong> solutions
          with <strong>React, Node.js, Express, and MongoDB</strong>.
        </p>
      </motion.header>

      {/* Grid */}
      {experience.length === 0 ? (
        <p className="text-center text-slate-500 text-sm">
          No experience records found.
        </p>
      ) : (
        <>
          <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                       gap-6 place-items-center"
          >
            {experience.map((exp) => (
              <Card key={exp.id} {...exp} />
            ))}
          </div>

          {/* Popup */}
          <Popup data={selected} onClose={() => setSelected(null)} />
        </>
      )}
    </section>
  );
};

export default Experience;
