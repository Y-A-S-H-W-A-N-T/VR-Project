import mongoose from "mongoose";

const PaymentDetailsSchema= new mongoose.Schema({
    orderId:{
        type:String,
       
    },
    paymentId:{
        type:String,
    },
    signature:{
            type:String,
    }
   
},{
    timestamps:true
}
)




export default mongoose.model("PaymentDetails", PaymentDetailsSchema);