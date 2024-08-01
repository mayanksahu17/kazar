import mongoose, {Schema, Document, } from "mongoose";
import { user } from "./User";

 

export interface Team extends Document{
    teamName : string;
    player1 : string;
    player2 : string;
    player3 : string;
    player4 : string;
    registeredTournament : [];
    leader : user;
}

const TeamSchema : Schema<Team> = new Schema({
    teamName : String,
    player1 : String,
    player2 : String,
    player3 : String,
    player4 : String,
    registeredTournament : [],
    leader : {type : Schema.Types.ObjectId, ref : 'User'}

})

export const Teams = ( mongoose.models.Team as mongoose.Model<Team>) || mongoose.model<Team>("Team", TeamSchema)
