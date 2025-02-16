export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    linkedin?: string;
    location?: string;
    github?: string;
    portfolio?: string;
  }
  
  export interface Education {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
  }
  
  export interface Experience {
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string;
  }
  
  export interface Skill {
    name: string;
    rating: number;
    category: string;
  }
  
  export interface Project {
    name: string;
    description: string;
    skillsUsed: string[];
  }
  
  export interface ResumeProfile {
    personalInfo: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
    projects: Project[];
    atsScore?: number;
    enhancedResume?: object;
    pdfUrl?: string;
  }