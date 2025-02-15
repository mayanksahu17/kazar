export interface Profile {
    pdfUrl(pdfUrl: any): unknown;
    id?: string;
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      location: string; // ✅ Required
      linkedin?: string;
      github: string; // ✅ Required
      portfolio?: string;
    };
    education: {
      institution: string;
      degree: string;
      field: string;
      startDate: string;
      endDate?: string;
      current: boolean;
      description?: string; // ✅ Optional to prevent validation errors
    }[];
    experience: {
      title: string; // ✅ Changed from `jobTitle` to `title` to match backend schema
      company: string;
      location: string;
      startDate: string;
      endDate?: string;
      description: string;
    }[];
    skills: {
      name: string;
      rating: number;
      category: string; // ✅ Made required to prevent validation errors
    }[];
    projects: {
      name: string;
      description: string;
      skillsUsed: string[];
    }[];
    atsScore?: number;
    template: ResumeTemplate; // ✅ Added to match frontend state
  }
  
  export type ResumeTemplate = "modern" | "minimalist" | "creative" | "executive";
  