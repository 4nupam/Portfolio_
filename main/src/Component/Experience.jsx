import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";

const Experience = () => {
  const [loading, setLoading] = useState(false);
  const [experience, setExperience] = useState([]);
  const [selected, setSelected] = useState(null); // Popup

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

  // 🔹 Popup
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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl overflow-y-auto max-h-[85vh]"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full bg-slate-100 p-2 hover:bg-slate-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-slate-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image */}
            <div className="flex justify-center mb-4">
              {data.image ? (
                <img
                  src={data.image}
                  alt={data.name}
                  className="h-20 w-20 object-cover rounded-full border border-indigo-100 shadow-sm"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                  <svg
                    className="h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5zM8 10.5h8"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-slate-900 text-center">
              {data.name}
            </h3>
            {data.Duration && (
              <p className="mt-1 text-xs text-slate-500 text-center">
                {data.Duration}
              </p>
            )}
            <p className="mt-4 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {data.description}
            </p>

            {data.link && (
              <div className="mt-6 text-center">
                <a
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-sm transition-all hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                >
                  View Project
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // 🔹 Card
  const Card = ({ id, name, Duration }) => (
    <motion.article
      key={id}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="relative flex flex-col justify-between h-full w-full max-w-md rounded-2xl 
                 border border-gray-200 bg-white/90 backdrop-blur-sm p-6 
                 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-indigo-200"
    >
      <div className="flex flex-col text-center">
        <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
        {Duration && (
          <p className="mt-1 text-xs text-slate-500 font-medium">{Duration}</p>
        )}
      </div>

      <button
        onClick={() => setSelected(experience.find((exp) => exp.id === id))}
        className="mt-6 inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 
                   text-xs font-medium text-white shadow-sm transition-all hover:bg-indigo-700 
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
      >
        View Details
      </button>
    </motion.article>
  );

  // 🔹 Loader
  if (loading)
    return (
      <div className="flex h-64 items-center justify-center text-lg font-medium text-indigo-600">
        Loading your experience...
      </div>
    );

  // 🔹 Main
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
          Hands-on experience with{" "}
          <strong>React, Node.js, Express, and MongoDB</strong>, delivering
          <strong> scalable web, desktop, and PWA solutions</strong>.
        </p>
      </motion.header>

      {/* Experience Carousel */}
      {experience.length === 0 ? (
        <p className="text-center text-slate-500 text-sm">
          No experience records found.
        </p>
      ) : (
        <>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            grabCursor={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {experience.map((exp) => (
              <SwiperSlide key={exp.id} className="flex justify-center">
                <Card id={exp.id} name={exp.name} Duration={exp.Duration} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Popup */}
          <Popup data={selected} onClose={() => setSelected(null)} />
        </>
      )}
    </section>
  );
};

export default Experience;
