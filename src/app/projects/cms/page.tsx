"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageBackground from "@/components/PageBackground";
import { cmsVariants } from "@/lib/animation-constants";
import { Project } from './types';
import { exportData } from './utils/cms-utils';
import { initialProjects } from './data/projects';
import ProjectSelector from './components/ProjectSelector';
import ContentEditor from './components/ContentEditor';

export default function CMSPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<string>("demo-project1");
  const [editingSection, setEditingSection] = useState<number | null>(null);

  const currentProject = projects.find(p => p.slug === selectedProject);

  return (
    <>
      <PageBackground color="#f9fafb" />
      
      <div className="min-h-screen relative z-10">
        <div className="max-w-6xl mx-auto p-6">
          {/* 顶部导航 */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={cmsVariants} 
            custom={0} 
            className="bg-white rounded-lg shadow-sm p-6 mb-6"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Project Content Management System</h1>
              <div className="flex gap-4">
                <button
                  onClick={() => exportData(projects)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Export Data
                </button>
                <Link
                  href="/"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：项目选择 */}
            <ProjectSelector 
              projects={projects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
            />

            {/* 中间：内容编辑 */}
            <ContentEditor 
              currentProject={currentProject}
              projects={projects}
              selectedProject={selectedProject}
              editingSection={editingSection}
              onUpdateProjects={setProjects}
              onSetEditingSection={setEditingSection}
            />
          </div>

          {/* 预览说明 */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={cmsVariants} 
            custom={100} 
            className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <h3 className="font-semibold text-blue-800 mb-2">Instructions</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Select a project from the left sidebar to edit</li>
              <li>• Use the top buttons to add different types of content blocks</li>
              <li>• Click &quot;Edit&quot; to modify content, click &quot;Done&quot; to save</li>
              <li>• Click &quot;Export Data&quot; to get a JSON file for updating project data</li>
              <li>• After editing, you need to update the actual project files for changes to take effect on the website</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  );
} 