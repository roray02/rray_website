export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  type: 'work' | 'research' | 'leadership';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  awards?: string[];
  coursework?: string[];
  activities?: string[];
  logo?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: 'bioinformatics' | 'computational-biology' | 'computer-science' | 'for-fun' | 'public-health';
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  images?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  github: string;
  linkedin?: string;
  location: string;
}