export type ProjectCategory = 'hackathon' | 'research' | 'product' | 'community';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  websiteUrl?: string;
  githubUrl?: string;
  devpostUrl?: string;
  paperUrl?: string;
  videoUrl?: string;
  featured: boolean;
  /** Editorial grid / filters */
  category: ProjectCategory;
  /** Shown on project card badge, e.g. 2026 */
  yearLabel: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design' | 'languages' | 'frameworks' | 'cloud' | 'databases' | 'ai' | 'certifications';
  description?: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  instagram?: string;
}
