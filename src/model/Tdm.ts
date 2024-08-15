import mongoose, { Document, Mongoose, Schema } from "mongoose";


export interface ITdm extends Document {
    name: String;
    status: String;
    thumbnail: String;
    createdAt: Date;
    winningPrice: Number;
    entryPrice: Number;
    registeredTeam1: mongoose.Types.ObjectId;
    registeredTeam2: mongoose.Types.ObjectId;
    launchDate: Date;
    launchTime : string;
    Weapon: string;
}
const TdmSchema: Schema<ITdm> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    winningPrice: {
        type: Number,
        required: true
    },
    entryPrice: {
        type: Number,
        required: true
    },
    registeredTeam1: {
        type: Schema.Types.ObjectId,
        ref: "Teams"
    },
    registeredTeam2: {
        type: Schema.Types.ObjectId,
        ref: "Teams"
    },
    launchDate: {
        type: Date,
        required: true
    },
    launchTime : {
        type: String,
    },
    Weapon: {
        type: String,
        default: "any"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

export const TDM = (mongoose.models.TDM as mongoose.Model<ITdm>) || mongoose.model<ITdm>("TDM", TdmSchema)
