import mongoose, { Schema, Document } from "mongoose";


export interface TransectionHistory extends Document{
    amount : Number,
    transectionMode : String,
    date : Date,
    transectionId : Number;
    userId : String;
}

const TransectionHistorySchema : Schema<TransectionHistory> = new Schema({
    amount : Number,
    transectionMode : String,
    date : Date,
    transectionId : Number,
    userId : String
})

export const Transectionhistory =  (mongoose.models.User as mongoose.Model<TransectionHistory>) || mongoose.model<TransectionHistory>("TransectionHistory", TransectionHistorySchema)
