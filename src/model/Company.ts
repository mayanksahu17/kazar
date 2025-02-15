import mongoose, { Schema, Document } from "mongoose";

export interface company extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  industry: string;
  internships: mongoose.Schema.Types.ObjectId[];
}

const CompanySchema: Schema<company> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  industry: { type: String, required: true },
  internships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

export const company =
  mongoose.models.Company ||
  mongoose.model<company>("Company", CompanySchema);
