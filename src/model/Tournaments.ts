import mongoose, {Schema, Document, } from "mongoose";
import { User } from "./User";
import { Team } from "./Teams";




export interface Tournament extends Document{
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
    Collection : Number
}

const tournamentSchema : Schema<Tournament> = new Schema({
    title : {
        type : String,
        // required: [true,"title is required"],
    },
    roomId : {
        type : String,
        // required: [true,"roomId is required"],
        },
    password : {
        type : String,
        // required: [true,"password is required"],
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
    Collection : {
        type : Number,
        default : 0
    }
    

})

export const Tournaments =  mongoose.model<Tournament>("Tournament", tournamentSchema)
