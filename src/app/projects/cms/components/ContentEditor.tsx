"use client";

import { motion } from "framer-motion";
import { cmsVariants } from "@/lib/animation-constants";
import { Project, ContentSection } from '../types';
import AddSectionButtons from './AddSectionButtons';
import SectionEditor from './SectionEditor';

interface ContentEditorProps {
  currentProject: Project | undefined;
  projects: Project[];
  selectedProject: string;
  editingSection: number | null;
  onUpdateProjects: (projects: Project[]) => void;
  onSetEditingSection: (section: number | null) => void;
}

export default function ContentEditor({
  currentProject,
  projects,
  selectedProject,
  editingSection,
  onUpdateProjects,
  onSetEditingSection
}: ContentEditorProps) {
  // 添加新的内容块
  const addSection = (type: ContentSection['type']) => {
    if (!currentProject) return;

    const newSection: ContentSection =
      type === 'bullet_list' || type === 'number_list'
        ? { type, items: ['New item'] }
        : type === 'link'
          ? { type, text: 'Link text', url: 'https://example.com' }
          : type === 'image'
            ? { type, url: 'https://placehold.co/600x400', alt: 'Image description' }
            : type === 'video'
              ? { type, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
              : { type, text: 'New content' };

    const updatedProjects = projects.map(p => 
      p.slug === selectedProject 
        ? { 
            ...p, 
            content: { 
              sections: [...p.content.sections, newSection] 
            } 
          }
        : p
    );
    onUpdateProjects(updatedProjects);
  };

  // 更新内容块
  const updateSection = (index: number, updates: Partial<ContentSection>) => {
    if (!currentProject) return;

    const updatedProjects = projects.map(p => 
      p.slug === selectedProject 
        ? { 
            ...p, 
            content: { 
              sections: p.content.sections.map((section, i) => 
                i === index ? { ...section, ...updates } : section
              )
            } 
          }
        : p
    );
    onUpdateProjects(updatedProjects);
  };

  // 删除内容块
  const deleteSection = (index: number) => {
    if (!currentProject) return;

    const updatedProjects = projects.map(p => 
      p.slug === selectedProject 
        ? { 
            ...p, 
            content: { 
              sections: p.content.sections.filter((_, i) => i !== index)
            } 
          }
        : p
    );
    onUpdateProjects(updatedProjects);
  };

  // 更新项目基本信息
  const updateProjectInfo = (field: 'title' | 'description', value: string) => {
    const updatedProjects = projects.map(p => 
      p.slug === selectedProject ? { ...p, [field]: value } : p
    );
    onUpdateProjects(updatedProjects);
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={cmsVariants} 
      custom={2} 
      className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Edit Content</h2>
        <AddSectionButtons onAddSection={addSection} />
      </div>

      {currentProject && (
        <div className="space-y-4">
          {/* 项目基本信息 */}
          <div className="border-b pb-4 mb-6">
            <input
              type="text"
              value={currentProject.title}
              onChange={(e) => updateProjectInfo('title', e.target.value)}
              className="w-full text-xl font-bold p-2 border rounded mb-2"
              placeholder="Project Title"
            />
            <textarea
              value={currentProject.description}
              onChange={(e) => updateProjectInfo('description', e.target.value)}
              className="w-full p-2 border rounded"
              rows={2}
              placeholder="Project Description"
            />
          </div>

          {/* 内容块列表 */}
          {currentProject.content.sections.map((section, index) => (
            <SectionEditor
              key={index}
              section={section}
              index={index}
              isEditing={editingSection === index}
              onEdit={() => onSetEditingSection(editingSection === index ? null : index)}
              onDelete={() => deleteSection(index)}
              onUpdate={(updates) => updateSection(index, updates)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
} 