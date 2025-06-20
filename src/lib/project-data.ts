// Unified project data management
// This file is the single source of truth for all project data

export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  cover: string;
  created: string;
}

// Basic project information for list display
export const projectsData: ProjectData[] = [
  {
    slug: "demo-project1",
    title: "Demo Project 1",
    description: "This is the first demo project showcasing project preview card effects.",
    cover: "/images/affine&ClawCloudRun.jpg",
    created: "2024-07-01",
  },
  {
    slug: "demo-project2",
    title: "Demo Project 2",
    description: "This is the second demo project showcasing project preview card effects.",
    cover: "/images/android.jpg",
    created: "2024-06-15",
  },
  {
    slug: "project3",
    title: "Project 3",
    description: "This is project 3 showcasing advanced features and celebrations.",
    cover: "/images/celebration.jpg",
    created: "2024-12-20",
  },
];

// Company information
export const companiesData = {
  affine: {
    name: "AFFiNE",
    href: "https://affine.pro",
    image: "/images/affine.png"
  },
  ming: {
    name: "MING Labs",
    href: "https://minglabs.com",
    image: "/images/ming.png"
  }
} as const; 