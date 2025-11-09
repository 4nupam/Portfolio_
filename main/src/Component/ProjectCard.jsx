import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({
  title,
  description,
  tech,
  github,
  live,
  images,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl duration-300 max-w-md mx-auto">
      {/* Image */}
      <img
        src={images}
        alt={title}
        className="w-full h-56 object-cover"
      />

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.split(/,|\n|↵/).map((item, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full"
            >
              {item.trim()}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
          >
            <FaExternalLinkAlt className="h-4 w-4" />
            Live Preview
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
          >
            <FaGithub className="h-4 w-4" />
            GitHub Repo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
