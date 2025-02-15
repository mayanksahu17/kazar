import mongoose, { Schema, Document } from "mongoose";

// Define the Professor Interface
export interface IProfessor extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  department: string;
  subjects: string[];
  assignedClasses: mongoose.Schema.Types.ObjectId[];
}

// Define Schema
const ProfessorSchema: Schema<IProfessor> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  department: { type: String, required: true },
  subjects: [{ type: String, required: true }],
  assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
});

// Prevent OverwriteModelError
export const Professor =
  mongoose.models.Professor || mongoose.model<IProfessor>("Professor", ProfessorSchema);
