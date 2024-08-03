import mongoose, {Schema, Document, } from "mongoose";


 

export interface Team extends Document{
    teamName : string;
    player1 : String;
    player2 : String;
    player3 : String;
    player4 : String;
    registeredTournament : [];
    leader : String;
}

const TeamSchema : Schema<Team> = new Schema({
    teamName : String,
    player1 : {type : String, default : null},
    player2 : {type : String, default : null},
    player3 : {type : String, default : null},
    player4 : {type : String, default : null},
    registeredTournament : [],
    leader : {type : String , default : null}

})

export const Teams = ( mongoose.models.Team as mongoose.Model<Team>) || mongoose.model<Team>("Team", TeamSchema)
