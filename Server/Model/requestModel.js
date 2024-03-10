import mongoose from "mongoose";

const RequestSchema= new mongoose.Schema({
    PropertyId:{
        type:String,
    },
    UserId:{
        type:String,
    }},
    {
        timestamps:true,
    }
)

export default mongoose.model("Request",RequestSchema)