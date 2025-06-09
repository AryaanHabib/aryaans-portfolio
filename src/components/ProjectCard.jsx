
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ translateY: -6 }}
      className="bg-secondary rounded-xl p-6 shadow-lg flex flex-col justify-between"
    >
      <div>
        <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map(t => (
            <span key={t} className="text-xs bg-primary px-2 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-4 text-lg">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer">
            <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </motion.div>
  );
}
