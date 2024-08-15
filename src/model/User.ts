import mongoose, {Schema, Document, } from "mongoose";
import { ITournament } from "./Tournaments";
import { TransectionHistory } from "./TrasectionHistory";
import { history } from "./History";
export interface user extends Document{
    userName : string,
    email : string,
    password : string,
    mobileNumber : Number,
    bgmiId : Number,
    upi : string ,
    walletBalance : Number ,
    tournaments: mongoose.Types.ObjectId[];
    transectionHistory : [TransectionHistory] 
    isLocked: boolean;
    loginAttempts: number;
    lockUntil: number ;
    verifyCode : string;
    teams : [];
    registeredTournaments : String;
    isAdmin : Boolean;
    bgmiUsername : string
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
    mobileNumber : {
        type : Number,
        required : [true,"please provide mobile number"],
    },
    bgmiId : {
        type : Number,
        required : [true,"please provide bgmi id"],
    },
    upi : {
        type : String,
        },
    walletBalance : {
        type : Number, 
        default : 0,
         },
    tournaments : [{
        type : Schema.Types.ObjectId,
        ref : "Tournament",
        }],
    transectionHistory : [{
        type : Schema.Types.ObjectId,
        ref : "TransectionHistory"
         }],
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
    teams : [{
         type : Schema.Types.ObjectId,
        ref : "Teams"
    }],
    registeredTournaments : [{
        type :  String
        
        }], 
    isAdmin : {
        type : Boolean,
        default : false
    },
    bgmiUsername : {
        type : String,
        default : null
    }
    
    

})


export const User = (mongoose.models.User as mongoose.Model<user>) || mongoose.model<user>("User", UserSchema)
