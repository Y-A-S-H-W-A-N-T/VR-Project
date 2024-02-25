import mongoose from "mongoose";

const adminSchema= new mongoose.Schema({
    name:{
        type:String,
       
    },
    email:{
        type:String,
     
    
    },
    password:{
       type:String,
    },
},{
    timestamps:true
}
)




export default mongoose.model("admin", adminSchema);