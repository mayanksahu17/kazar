import mongoose, {Schema, Document, Mongoose, } from "mongoose";
import { user } from "./User";
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
    owner : user,
    participants : Team,
    requiredTeamsize : Number,
    launchDate : Date,
    Collection : Number
    thumbNail : string
}

const tournamentSchema : Schema<Tournament> = new Schema({
    title : {
        type : String,
    },
    roomId : {
        type : String,
        },
    password : {
        type : String,
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
    launchDate : {
        type : Date,
    },
    Collection : {
        type : Number,
        default : 0
    },
    thumbNail : {
        type : String,
    }
    

})

export const Tournaments = (mongoose.models.Tournament as mongoose.Model<Tournament>) ||  mongoose.model<Tournament>("Tournament", tournamentSchema)
