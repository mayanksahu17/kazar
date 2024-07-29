import mongoose, {Schema, Document, } from "mongoose";
import { user } from "./User";

 

export interface Team extends Document{
    teamName : string,
    player1 : user
    player2 : user
    player3 : user
    player4 : user
    registered : boolean
    leader : user
}

const TeamSchema : Schema<Team> = new Schema({
    teamName : String,
    player1 : {type : Schema.Types.ObjectId, ref : 'User', default : null},
    player2 : {type : Schema.Types.ObjectId, ref : 'User', default : null},
    player3 : {type : Schema.Types.ObjectId, ref : 'User', default : null},
    player4 : {type : Schema.Types.ObjectId, ref : 'User', default : null},
    registered : Boolean,
    leader : {type : Schema.Types.ObjectId, ref : 'User'}

})

export const Teams = ( mongoose.models.Team as mongoose.Model<Team>) || mongoose.model<Team>("Team", TeamSchema)
