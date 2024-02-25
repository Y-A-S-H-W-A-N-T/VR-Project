//Admin

import express from "express";

const router=express.Router();

router.get("/register",(req,res)=>{
    res.send("register")
})
router.get("/login",(req,res)=>{
    res.send("login")
})

export default router;