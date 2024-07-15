import mongoose, {Schema, Document, } from "mongoose";
import { User } from "./User";

 

export interface Team extends Document{
    teamName : string,
    player1 : User
    player2 : User
    player3 : User
    player4 : User
    registered : boolean
}

const TeamSchema : Schema<Team> = new Schema({
    teamName : String,
    player1 : {type : Schema.Types.ObjectId, ref : 'User'},
    player2 : {type : Schema.Types.ObjectId, ref : 'User'},
    player3 : {type : Schema.Types.ObjectId, ref : 'User'},
    player4 : {type : Schema.Types.ObjectId, ref : 'User'},
    registered : Boolean
})

const Team = (mongoose.models.User as mongoose.Model<Team>) || mongoose.model<Team>("Team", TeamSchema)
