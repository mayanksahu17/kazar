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
    eligible : string ,
    owner : user,
    time : Number,
    participants : any,
    launchDate : Date,
    Collection : Number,
    thumbNail : string,
    maxTeams: number;
    currentTeams: number;
    sponsors: string[];
    createdAt: Date;
    updatedAt: Date;

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
    eligible : {
        type : String,
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    participants : {
        type : String   
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
    },
    time : {
        type : Number
    },  
    maxTeams: {
         type: Number,
          required: true
         },
    currentTeams: {
         type: Number,
          default: 0
         },
    sponsors: {
         type: [String], 
         default: []
         },
         createdAt: { type: Date, default: Date.now },
         updatedAt: { type: Date, default: Date.now }

})



tournamentSchema.pre<Tournament>('save', function(next) {
    this.updatedAt = new Date();
    next();
  });


export const Tournaments = (mongoose.models.Tournament as mongoose.Model<Tournament>) ||  mongoose.model<Tournament>("Tournament", tournamentSchema)
