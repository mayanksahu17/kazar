import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    linkedin: { type: String },
    github: { type: String, required: true },
    portfolio: { type: String },
  },
  education: [
    {
      institution: { type: String, required: true },
      degree: { type: String, required: true },
      field: { type: String, required: true },
      startDate: { type: String, required: true },
      endDate: { type: String },
      current: { type: Boolean, required: true },
      description: { type: String },
    },
  ],
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String, required: true },
      startDate: { type: String, required: true },
      endDate: { type: String },
      description: { type: String, required: true },
    },
  ],
  skills: [
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      category: { type: String, required: true },
    },
  ],
  projects: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      skillsUsed: [{ type: String, required: true }],
    },
  ],
});

export default ProfileSchema;
