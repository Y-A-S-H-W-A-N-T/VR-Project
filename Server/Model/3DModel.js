import mongoose from "mongoose";

const threeDSchema= new mongoose.Schema({
    Image_name:{
        type:String,
       
    },
    Image_url:{
        type:String,
     
    
    },
   
},{
    timestamps:true
}
)




export default mongoose.model("threeD", threeDSchema);