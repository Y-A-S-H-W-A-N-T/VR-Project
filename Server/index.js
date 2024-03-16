import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./Routes/userRouter.js"
import adminRouter from "./Routes/adminRouter.js"
import propRouter from './Routes/propRouter.js'
import threeDSchema from './Routes/3DRouter.js'
import bodyParser from "body-parser"
import cors from "cors"
import multer from "multer"
import Razorpay from "razorpay";
import rout from "./Routes/Payment.js";

dotenv.config()
const PORT=3000
const app=express();


mongoose.connect('mongodb+srv://abishchhetri2502:gKa7BjeOgvMiw2DU@cluster0.n6whocg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{console.log("DB Connected!")})
.catch((err)=>{console.log(err)})
app.use(cors())

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/property",propRouter)
app.use("/assets",threeDSchema)



app.use(express.json({ extended: false }));

app.use("/payment", rout);

app.listen(PORT,()=>{console.log("let's go,Server Started! ")})


