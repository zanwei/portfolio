import { Project } from '../types';

// 初始项目数据
export const initialProjects: Project[] = [
  {
    slug: "demo-project1",
    title: "Demo Project 1", 
    description: "This is the first demo project showcasing project preview card effects.",
    cover: "/images/affine&ClawCloudRun.jpg",
    created: "2024-07-01",
    content: {
      sections: [
        {
          type: "heading1",
          text: "Project Overview"
        },
        {
          type: "paragraph",
          text: "Demo Project 1 is a comprehensive demonstration project designed to showcase modern web development best practices and design principles. This project integrates user experience design, frontend development technologies, and content management system core functionalities."
        },
        {
          type: "heading2",
          text: "Technical Features"
        },
        {
          type: "paragraph",
          text: "This project adopts the latest technology stack to ensure high performance and maintainability:"
        },
        {
          type: "bullet_list",
          items: [
            "Next.js 14 - Modern React framework",
            "TypeScript - Type-safe development experience",
            "Tailwind CSS - Atomic CSS management",
            "Responsive Design - Perfect adaptation to various devices"
          ]
        },
        {
          type: "heading3",
          text: "Development Process"
        },
        {
          type: "number_list",
          items: [
            "Requirements analysis and user research",
            "Prototype design and interaction design",
            "Technical architecture and development implementation",
            "Testing validation and performance optimization",
            "Deployment and continuous maintenance"
          ]
        },
        {
          type: "quote",
          text: "Excellent design is not just about aesthetics, but more importantly about solving real problems and creating value for users."
        },
        {
          type: "heading2",
          text: "Project Results"
        },
        {
          type: "paragraph",
          text: "Through careful design and development, we have successfully created a project showcase platform that is both beautiful and practical. This platform not only demonstrates technical capabilities but also reflects deep thinking about user experience."
        },
        {
          type: "image",
          urls: [
            "/images/placeholderImage.png",
            "/images/placeholderImage.png",
            "/images/placeholderImage.png"
          ],
          alt: "多图占位示例"
        },
        {
            type: "paragraph",
            text: "Through careful design and development, we have successfully created a project showcase platform that is both beautiful and practical. This platform not only demonstrates technical capabilities but also reflects deep thinking about user experience."
        },
        {
          type: "code",
          code: `export default function ProjectSelector({ 
  projects, 
  selectedProject, 
  onSelectProject 
}: ProjectSelectorProps) {
  return (
    <motion.div 
      initial=\"hidden\" 
      animate=\"visible\" 
      variants={fadeInVariants} 
      custom={1} 
      className=\"bg-white rounded-lg shadow-sm p-6\"
    >
      <h2 className=\"text-lg font-semibold mb-4\">Select Project</h2>
      <div className=\"space-y-2\">
        {projects.map(project => (
          <button
            key={project.slug}
            onClick={() => onSelectProject(project.slug)}
            className={\`w-full text-left p-3 rounded-lg transition-colors \\\${selectedProject === project.slug 
              ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
              : 'bg-gray-50 hover:bg-gray-100'}\`}
          >
            <div className=\"font-medium\">{project.title}</div>
            <div className=\"text-sm text-gray-600\">{project.slug}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}`,
          language: "tsx"
        }
      ]
    }
  },
  {
    slug: "demo-project2",
    title: "Demo Project 2",
    description: "This is the second demo project showcasing project preview card effects.",
    cover: "/images/android.jpg",
    created: "2024-06-15",
    content: {
      sections: [
        {
          type: "heading1",
          text: "Project Overview"
        },
        {
          type: "paragraph",
          text: "Demo Project 1 is a comprehensive demonstration project designed to showcase modern web development best practices and design principles. This project integrates user experience design, frontend development technologies, and content management system core functionalities."
        },
        {
          type: "heading2",
          text: "Technical Features"
        },
        {
          type: "paragraph",
          text: "This project adopts the latest technology stack to ensure high performance and maintainability:"
        },
        {
          type: "bullet_list",
          items: [
            "Next.js 14 - Modern React framework",
            "TypeScript - Type-safe development experience",
            "Tailwind CSS - Atomic CSS management",
            "Responsive Design - Perfect adaptation to various devices"
          ]
        },
        {
          type: "heading3",
          text: "Development Process"
        },
        {
          type: "number_list",
          items: [
            "Requirements analysis and user research",
            "Prototype design and interaction design",
            "Technical architecture and development implementation",
            "Testing validation and performance optimization",
            "Deployment and continuous maintenance"
          ]
        },
        {
          type: "quote",
          text: "Excellent design is not just about aesthetics, but more importantly about solving real problems and creating value for users."
        },
        {
          type: "heading2",
          text: "Project Results"
        },
        {
          type: "paragraph",
          text: "Through careful design and development, we have successfully created a project showcase platform that is both beautiful and practical. This platform not only demonstrates technical capabilities but also reflects deep thinking about user experience."
        },
        {
          type: "code",
          code: `export default function ProjectSelector({ 
  projects, 
  selectedProject, 
  onSelectProject 
}: ProjectSelectorProps) {
  return (
    <motion.div 
      initial=\"hidden\" 
      animate=\"visible\" 
      variants={fadeInVariants} 
      custom={1} 
      className=\"bg-white rounded-lg shadow-sm p-6\"
    >
      <h2 className=\"text-lg font-semibold mb-4\">Select Project</h2>
      <div className=\"space-y-2\">
        {projects.map(project => (
          <button
            key={project.slug}
            onClick={() => onSelectProject(project.slug)}
            className={\`w-full text-left p-3 rounded-lg transition-colors \\\${selectedProject === project.slug 
              ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
              : 'bg-gray-50 hover:bg-gray-100'}\`}
          >
            <div className=\"font-medium\">{project.title}</div>
            <div className=\"text-sm text-gray-600\">{project.slug}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}`,
          language: "tsx"
        }
      ]
    }
  },
  {
    slug: "project3",
    title: "Project 3",
    description: "This is project 3 showcasing advanced features and celebrations.",
    cover: "/images/celebration.jpg",
    created: "2024-12-20",
    content: {
      sections: [
        {
          type: "heading1",
          text: "Project Overview"
        },
        {
          type: "paragraph",
          text: "Project 3 is an innovative celebration project designed to showcase advanced web development techniques and engaging user experiences. This project combines cutting-edge design patterns with robust technical implementation to create memorable digital experiences."
        },
        {
          type: "heading2",
          text: "Technical Features"
        },
        {
          type: "paragraph",
          text: "This project adopts the latest technology stack to ensure high performance and maintainability:"
        },
        {
          type: "bullet_list",
          items: [
            "Next.js 14 - Modern React framework",
            "TypeScript - Type-safe development experience",
            "Tailwind CSS - Atomic CSS management",
            "Responsive Design - Perfect adaptation to various devices"
          ]
        },
        {
          type: "heading3",
          text: "Development Process"
        },
        {
          type: "number_list",
          items: [
            "Requirements analysis and user research",
            "Prototype design and interaction design",
            "Technical architecture and development implementation",
            "Testing validation and performance optimization",
            "Deployment and continuous maintenance"
          ]
        },
        {
          type: "quote",
          text: "Excellent design is not just about aesthetics, but more importantly about solving real problems and creating value for users."
        },
        {
          type: "heading2",
          text: "Project Results"
        },
        {
          type: "paragraph",
          text: "Through careful design and development, we have successfully created a project showcase platform that is both beautiful and practical. This platform not only demonstrates technical capabilities but also reflects deep thinking about user experience."
        },
        {
          type: "code",
          code: `export default function ProjectSelector({ 
  projects, 
  selectedProject, 
  onSelectProject 
}: ProjectSelectorProps) {
  return (
    <motion.div 
      initial=\"hidden\" 
      animate=\"visible\" 
      variants={fadeInVariants} 
      custom={1} 
      className=\"bg-white rounded-lg shadow-sm p-6\"
    >
      <h2 className=\"text-lg font-semibold mb-4\">Select Project</h2>
      <div className=\"space-y-2\">
        {projects.map(project => (
          <button
            key={project.slug}
            onClick={() => onSelectProject(project.slug)}
            className={\`w-full text-left p-3 rounded-lg transition-colors \\\${selectedProject === project.slug 
              ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
              : 'bg-gray-50 hover:bg-gray-100'}\`}
          >
            <div className=\"font-medium\">{project.title}</div>
            <div className=\"text-sm text-gray-600\">{project.slug}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}`,
          language: "tsx"
        }
      ]
    }
  }
]; 