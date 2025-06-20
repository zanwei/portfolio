import { motion } from "framer-motion";
import { Project } from '../types';
import { fadeInVariants } from '../../../../lib/animation-constants';

interface ProjectSelectorProps {
  projects: Project[];
  selectedProject: string;
  onSelectProject: (slug: string) => void;
}

export default function ProjectSelector({ 
  projects, 
  selectedProject, 
  onSelectProject 
}: ProjectSelectorProps) {
  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={fadeInVariants} 
      custom={1} 
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h2 className="text-lg font-semibold mb-4">Select Project</h2>
      <div className="space-y-2">
        {projects.map(project => (
          <button
            key={project.slug}
            onClick={() => onSelectProject(project.slug)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedProject === project.slug 
                ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="font-medium">{project.title}</div>
            <div className="text-sm text-gray-600">{project.slug}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );
} 