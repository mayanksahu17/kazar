import mongoose , {Schema , Document} from "mongoose";

export interface history extends Document{
    amoumt : string;
    transectionMode : string;
    date : Date;
    status : string ;
    transactionId : string;
}

const historySchema : Schema<history>  = new  Schema({
    amoumt : String,
    transectionMode : String,
    date : Date,
    status : String,
    transactionId : String,
})

export const History = mongoose.model("Histiry",historySchema)