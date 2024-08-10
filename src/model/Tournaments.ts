import mongoose, {Schema, Document, Mongoose, } from "mongoose";
import { user } from "./User";
import { Team } from "./Teams";




  export interface ITournament extends Document {
    owner: string;
    title: string;
    mode: string;
    map: string;
    winningPrice: Number;
    rank1Price: Number;
    rank2Price: Number;
    rank3Price: Number;
    eligibility: string;
    launchDate: Date;
    time: string;
    requiredTeamSize: number;
    entryPrice: number;
    thumbnail: string;
    status : string;
    registeredTeams :  mongoose.Types.ObjectId[];
    registeredSoloTeams :  mongoose.Types.ObjectId[];
  
  }

  const tournamentSchema: Schema<ITournament> = new Schema({
    owner: { type: String, required: true },
    title: { type: String, required: true },
    mode: { type: String, required: true },
    map: { type: String, required: true },
    winningPrice: { type: Number, required: true },
    rank1Price: { type: Number, required: true },
    rank2Price: { type: Number, required: true },
    rank3Price: { type: Number, required: true },
    eligibility: { type: String, required: true },
    launchDate: { type: Date, required: true },
    time: { type: String, required: true },
    requiredTeamSize: { type: Number, required: true },
    entryPrice: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    status: { type: String, default : "Upcoming" },
    registeredTeams : [{ type : mongoose.Types.ObjectId , ref : "Team"}],
    registeredSoloTeams : [{ type : mongoose.Types.ObjectId , ref : "User"}]
  });



export const Tournaments = (mongoose.models.Tournament as mongoose.Model<ITournament>) ||  mongoose.model<ITournament>("Tournament", tournamentSchema)
