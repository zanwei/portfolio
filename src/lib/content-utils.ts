// Content section type definitions
export interface ContentSection {
  type: 'heading1' | 'heading2' | 'heading3' | 'paragraph' | 'quote' | 'bullet_list' | 'number_list';
  text?: string;
  items?: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  cover: string;
  content: {
    sections: ContentSection[];
  };
}

// Generate TypeScript code for project data
export function generateProjectsCode(projects: Project[]): string {
  return `const projects = ${JSON.stringify(projects, null, 2)};`;
}

// Validate project data format
export function validateProjectData(data: unknown): data is Project[] {
  if (!Array.isArray(data)) return false;
  
  return data.every((project: unknown) => 
    typeof project === 'object' &&
    project !== null &&
    'slug' in project &&
    'title' in project &&
    'description' in project &&
    'cover' in project &&
    'content' in project &&
    typeof (project as Record<string, unknown>).slug === 'string' &&
    typeof (project as Record<string, unknown>).title === 'string' &&
    typeof (project as Record<string, unknown>).description === 'string' &&
    typeof (project as Record<string, unknown>).cover === 'string' &&
    (project as Record<string, unknown>).content &&
    typeof (project as Record<string, unknown>).content === 'object' &&
    (project as Record<string, unknown>).content !== null &&
    'sections' in ((project as Record<string, unknown>).content as Record<string, unknown>) &&
    Array.isArray(((project as Record<string, unknown>).content as Record<string, unknown>).sections) &&
    (((project as Record<string, unknown>).content as Record<string, unknown>).sections as unknown[]).every((section: unknown) => 
      typeof section === 'object' &&
      section !== null &&
      'type' in section &&
      typeof (section as Record<string, unknown>).type === 'string' &&
      ['heading1', 'heading2', 'heading3', 'paragraph', 'quote', 'bullet_list', 'number_list'].includes((section as Record<string, unknown>).type as string) &&
      (!('text' in section) || typeof (section as Record<string, unknown>).text === 'string') &&
      (!('items' in section) || Array.isArray((section as Record<string, unknown>).items))
    )
  );
}

// Style mapping for rendering content blocks
export const contentStyles = {
  heading1: "text-[1.375rem] font-serif font-medium text-black leading-tight mb-6 mt-8 first:mt-0",
  heading2: "text-[1.25rem] font-serif font-medium text-black leading-tight mb-4 mt-8",
  heading3: "text-[1.125rem] font-serif font-medium text-black leading-tight mb-4 mt-6",
  paragraph: "font-sans text-[1rem] text-black leading-relaxed mb-4",
  quote: "border-l-4 border-gray-400 pl-6 my-6 italic font-sans text-[1rem] text-gray-700 leading-relaxed",
  bullet_list: "list-disc list-inside space-y-2 mb-4 ml-4 font-sans text-[1rem] text-black leading-relaxed",
  number_list: "list-decimal list-inside space-y-2 mb-4 ml-4 font-sans text-[1rem] text-black leading-relaxed",
};

// Generate style guide documentation
export const styleGuide = {
  title: {
    description: "Page main title",
    className: "text-[1.5rem] font-serif italic font-medium text-black leading-tight",
    fontFamily: "Times, serif",
    example: "Demo Project 1"
  },
  heading1: {
    description: "Heading 1 - Primary sections",
    className: contentStyles.heading1,
    fontFamily: "ABCDiatype, sans-serif",
    example: "Project Overview"
  },
  heading2: {
    description: "Heading 2 - Secondary sections",
    className: contentStyles.heading2,
    fontFamily: "ABCDiatype, sans-serif",
    example: "Technical Features"
  },
  heading3: {
    description: "Heading 3 - Subsections",
    className: contentStyles.heading3,
    fontFamily: "ABCDiatype, sans-serif",
    example: "Development Process"
  },
  paragraph: {
    description: "Body text paragraphs",
    className: contentStyles.paragraph,
    fontFamily: "ABCDiatype, sans-serif",
    example: "This is an example paragraph showcasing body text font and spacing effects."
  },
  quote: {
    description: "Quote blocks - Important viewpoints or famous quotes",
    className: contentStyles.quote,
    fontFamily: "ABCDiatype, sans-serif",
    example: "Excellent design is not just about aesthetics, but more importantly about solving real problems."
  },
  bullet_list: {
    description: "Unordered lists - Parallel points",
    className: contentStyles.bullet_list,
    fontFamily: "ABCDiatype, sans-serif",
    example: ["First point", "Second point", "Third point"]
  },
  number_list: {
    description: "Ordered lists - Sequential steps or prioritized items",
    className: contentStyles.number_list,
    fontFamily: "ABCDiatype, sans-serif",
    example: ["First step", "Second step", "Third step"]
  }
}; 