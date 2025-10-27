// For Experience Section
export interface ExperienceItem {
  company: string;
  title: string;
  dates: string;
  description: string[];
}

// For Project Section
export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

// For Contact Form
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  company?: string;
  honeypotField?: string; // For spam prevention
}