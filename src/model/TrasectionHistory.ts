import mongoose, { Schema, Document } from "mongoose";


export interface TransectionHistory extends Document{
    amount : Number,
    transectionMode : string,
    date : Date,
    transectionId : Number
}

const TransectionHistorySchema : Schema<TransectionHistory> = new Schema({
    amount : Number,
    transectionMode : String,
    date : Date,
    transectionId : Number
})

const TransectionHistory =  (mongoose.models.User as mongoose.Model<TransectionHistory>) || mongoose.model<TransectionHistory>("TransectionHistory", TransectionHistorySchema)
