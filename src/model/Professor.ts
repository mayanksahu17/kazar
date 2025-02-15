import mongoose, { Schema, Document } from "mongoose";

export interface professor extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  department: string;
  subjects: string[];
  assignedClasses: mongoose.Schema.Types.ObjectId[];
}

const ProfessorSchema: Schema<professor> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  department: { type: String, required: true },
  subjects: [{ type: String, required: true }],
  assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
});

export const professor =
  mongoose.models.Professor ||
  mongoose.model<professor>("Professor", ProfessorSchema);
