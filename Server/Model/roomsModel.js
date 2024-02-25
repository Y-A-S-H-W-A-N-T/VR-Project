import mongoose from "mongoose";

const roomSchema= new mongoose.Schema({
    location:{
        type:String,
       
    },
    price:{
        type:String,
        required:true,
    },
    name:{
       type:String,
    },
    type:{
        type:String,
     },
    image:{
        type:String,
     },
},{
    timestamps:true
}
)


// const Rooms=new mongoose.model("Room");

// export default Rooms;

export default mongoose.model("Room", roomSchema);