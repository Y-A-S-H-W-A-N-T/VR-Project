import mongoose from "mongoose";

const roomSchema= new mongoose.Schema({
    location:{
        type:String,
       
    },
    city:{
        type:String,
        required:true,
    },
    images:{
       type:String,
    },
},{
    timestamps:true
}
)


// const Rooms=new mongoose.model("Room");

// export default Rooms;

export default mongoose.model("Room", roomSchema);