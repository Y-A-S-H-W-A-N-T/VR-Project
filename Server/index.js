import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./Routes/userRouter.js"
import adminRouter from "./Routes/adminRouter.js"
import propRouter from './Routes/propRouter.js'
import bodyParser from "body-parser"
import cors from "cors"
import multer from "multer"
const app=express();
const PORT=3000
dotenv.config()

mongoose.connect(process.env.MONGODB)
.then(()=>{console.log("Yeahh Elvishhh Bhaii DB Connected!!!")})
.catch((err)=>{console.log(err)})


app.use(cors())
app.use(express.json());
app.use('/uploads', express.static('./uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/property",propRouter);

app.listen(PORT,()=>{console.log("Challo! Server hogaya suru...")})


