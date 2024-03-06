import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
       
    },
    email:{
        type:String,
        required:true,
       
    },
    number:{
       type:Number,
       unique:true,
    },
    password:{
        type:String,
    },
    showProperty:{
        type:[String]
    },
    isAdmin:
    {
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
}
)


export default mongoose.model("user", userSchema);