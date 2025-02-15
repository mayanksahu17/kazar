import mongoose, { Schema, Document } from "mongoose";
import ProfileSchema from "./Profile"; // Reusing the profile schema

export interface IStudent extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  enrollmentNumber: string;
  year: number;
  section: string;
  classId: mongoose.Schema.Types.ObjectId;
  profile: typeof ProfileSchema;
  scores: {
    academics: number;
    practicals: number;
    extracurriculars: number;
    totalScore?: number; // Made optional since it's computed
  };
}

const StudentSchema: Schema<IStudent> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  enrollmentNumber: { type: String, unique: true, required: true },
  year: { type: Number, required: true },
  section: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  profile: ProfileSchema, // Embedded profile schema
  scores: {
    academics: { type: Number, default: 0 },
    practicals: { type: Number, default: 0 },
    extracurriculars: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 }, // Will be overridden by virtual
  },
});


// 🔹 Prevent OverwriteModelError
const Student = mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);

export { Student };
