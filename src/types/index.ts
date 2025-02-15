export interface StudentProfile {
    enrollmentNumber: string;
    year: number;
    section: string;
    profile: object;
  }
  
  export interface ProfessorProfile {
    teachingExperience: string;
    subjects: string[];
    achievements: string[];
  }
  
  export interface CompanyProfile {
    name: string;
    industry: string;
    internships: string[];
  }
  