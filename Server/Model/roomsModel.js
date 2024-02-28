import mongoose from "mongoose";

const roomSchema= new mongoose.Schema({
    name: [{
        type: String,
        required: true
    }],
    images: [{
        type: String,
        required: true
    }]

},{
    timestamps:true
}
)


// const Rooms=new mongoose.model("Room");

// export default Rooms;

export default mongoose.model("Room", roomSchema);