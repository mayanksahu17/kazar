import mongoose, {Schema, Document, } from "mongoose";

export interface user extends Document{
    userName : string,
    email : string,
    password : string,

    isLocked: boolean;
    loginAttempts: number;
    lockUntil: number ;
    verifyCode : string;
    role : string;
}


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
