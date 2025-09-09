export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  paperUrl?: string;
  featured: boolean;
  category: 'ai' | 'web' | 'research' | 'systems';
  iframeUrl?: string;
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
  category: 'languages' | 'frameworks' | 'cloud' | 'databases' | 'ai' | 'tools' | 'certifications';
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  instagram?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}
