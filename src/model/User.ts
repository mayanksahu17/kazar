import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  mobileNumber: number;
  isLocked: boolean;
  loginAttempts: number;
  lockUntil: number;
  verifyCode: string;
  role: "student" | "professor" | "company" | "admin";
  profileCompleted: boolean; 
}

const UserSchema: Schema<User> = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    mobileNumber: {
      type: Number,
      // required: [true, "Please provide a mobile number"],
    },
    isLocked: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Number, default: null },
    verifyCode: {
      type: String,
      required: [true, "Verify code is required"],
    },
    role: {
      type: String,
      enum: ["student", "professor", "company", "admin"],
      required: true, // Role is required at signup
    },
    profileCompleted: {
      type: Boolean,
      default: false, // Set to false until profile form is filled
    },
  },
  { timestamps: true }
);

export const User =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
