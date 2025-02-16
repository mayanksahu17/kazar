
import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  userId: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin?: string;
    location?: string;
    github?: string;
    portfolio?: string;
  };
  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
  }[];
  experience: {
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  skills: { name: string; rating: number; category: string }[];
  projects: { name: string; description: string; skillsUsed: string[] }[];
  atsScore?: number;
  enhancedResume?: object;
  pdfUrl?: string;
}

const ProfileSchema = new Schema<IProfile>(
  {
    userId: { type: String, required: true, unique: true },
    personalInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      linkedin: { type: String },
      location: { type: String },
      github: { type: String },
      portfolio: { type: String },
    },
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        field: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String },
        current: { type: Boolean },
      },
    ],
    experience: [
      {
        jobTitle: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String },
        startDate: { type: String, required: true },
        endDate: { type: String },
        description: { type: String, required: true },
      },
    ],
    skills: [{ name: String, rating: Number, category: String }],
    projects: [{ name: String, description: String, skillsUsed: [String] }],
    atsScore: { type: Number },
    enhancedResume: { type: Object },
    pdfUrl: { type: String },
  },
  { timestamps: true }
);

export { ProfileSchema };
export default mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);
