import mongoose, {Schema, Document, } from "mongoose";
import { User } from "./User";
import { Twallet } from "./Wallet";
import { Team } from "./Teams";



export interface Tournaments extends Document{
    title : string,
    roomId : string,
    password : string,
    entryPrice : Number,
    mode : string,
    map : string,
    winningPrice : Number,
    eligiblity : string ,
    owner : User,
    participants : Team,
    requiredTeamsize : Number,
    launchDate : Date,
    twallet : Twallet,
}

const tournamentSchema : Schema<Tournaments> = new Schema({
    title : {
        type : String,
        required: [true,"title is required"],
    },
    roomId : {
        type : String,
        required: [true,"roomId is required"],
        },
    password : {
        type : String,
        required: [true,"password is required"],
    },
    entryPrice : {
        type : Number,
        },
    mode : {
        type : String,
        }, 
    map : {
        type : String,
    },
    winningPrice : {
        type : Number,
        },
    eligiblity : {
        type : String,
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    participants : {
        type : Schema.Types.ObjectId,
        ref : "Team",
        },
    

})

const Tournaments = (mongoose.models.User as mongoose.Model<Tournaments>) || mongoose.model<Team>("Tournaments", tournamentSchema)
