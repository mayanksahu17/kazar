import mongoose , {Document , Mongoose, Schema} from "mongoose";
import { Teams } from "./Teams";
import { exportTraceState } from "next/dist/trace";

export interface IRegisterREQ extends Document {
    transactionId : String,
    imageUrl: String,
    amount : Number,
    teamName: String;
    userName : String;
}


const RegisterREQSchema  : Schema<IRegisterREQ> = new mongoose.Schema({
    transactionId :{ type :  String},
    imageUrl: { type : String},
    amount : { type : Number},
    teamName: { type : String}
})

export const RegisterREQ = (mongoose.models.RegisterREQ as mongoose.Model<IRegisterREQ>) || mongoose.model<IRegisterREQ>("RegisterREQ" , RegisterREQSchema)

