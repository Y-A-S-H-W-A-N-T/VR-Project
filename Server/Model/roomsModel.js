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
    Room1:{
        type:String,
        default:"NoAvail.jpg"
     },
    Room2:{
        type:String,
        default:"NoAvail.jpg"
     },
    Room3:{
        type:String,
        default:"NoAvail.jpg"
     },
     Room4:{
        type:String,
        default:"NoAvail.jpg"
    },

},{
    timestamps:true
}
)


// const Rooms=new mongoose.model("Room");

// export default Rooms;

export default mongoose.model("Room", roomSchema);