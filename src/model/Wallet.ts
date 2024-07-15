import mongoose, { Schema, Document } from "mongoose";


export interface Twallet extends Document {
    tournamentId: string,
    title: string,
    winPrice: Number
}

const tWalletSchema: Schema<Twallet> = new Schema({
    tournamentId: { type: String, required: true },
    title: { type: String, required: true },
    winPrice: { type: Number, required: true }
})


const Twallet = (mongoose.models.User as mongoose.Model<Twallet>) || mongoose.model<Twallet>("Twallet", tWalletSchema)

