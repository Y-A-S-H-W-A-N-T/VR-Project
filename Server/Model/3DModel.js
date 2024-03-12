import mongoose from "mongoose";

const threeDSchema= new mongoose.Schema({
    asset_name:{
        type:String,
       
    },
    asset_link:{
        type:String,
    },
   
},{
    timestamps:true
}
)




export default mongoose.model("threeD", threeDSchema);