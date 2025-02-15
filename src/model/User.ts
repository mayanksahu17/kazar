import mongoose, { Schema, Document } from "mongoose";

<<<<<<< HEAD
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
=======
export interface user extends Document{
    userName : string,
    email : string,
    password : string,

    isLocked: boolean;
    loginAttempts: number;
    lockUntil: number ;
    verifyCode : string;
    role : string;
>>>>>>> d825a258ff4638a067822054f234d822e13aed6e
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
      required: [true, "Please provide a mobile number"],
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

<<<<<<< HEAD
export const User =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
=======
const UserSchema : Schema<user> = new Schema({
    userName   : {
        type: String ,
        required: [true,"Username is required"],
        unique : true,
    },
    email   : {
        type: String ,
        required: [true,"email is required"],
        trim : true,
        unique : true,
        match: [/.+\@.+\..+/,"please use a valid email address"]
    },
    password : {
        type: String,
        required : [true,"please provide password"],
    },
    isLocked: { 
        type: Boolean,
         default: false
         },
    loginAttempts: { 
        type: Number, 
        default: 0 
    },
    lockUntil: { 
        type: Number, 
        default: null 
    },
    verifyCode : {
        type : String,
        required : [true, "verify code is required"]
    },
    
    role : {
        type : String,
        default : null,
        required: true
    }
    
    

})


export const User = (mongoose.models.User as mongoose.Model<user>) || mongoose.model<user>("User", UserSchema)
>>>>>>> d825a258ff4638a067822054f234d822e13aed6e
