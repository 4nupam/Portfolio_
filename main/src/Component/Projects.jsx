import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules"; // no arrows, free scrolling
import "swiper/css";
import "swiper/css/free-mode";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden transition-all duration-500 ease-in-out">
      <div className="max-w-7xl w-full px-6">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading projects...
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full"
          >
            <Swiper
              modules={[FreeMode]}
              freeMode={true}
              grabCursor={true}
              spaceBetween={30}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 1.4 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="py-6"
            >
              {projects.map((project, index) => (
                <SwiperSlide key={project.id || index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      tech={project.tech}
                      github={project.github}
                      live={project.live}
                      images={project.images}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
