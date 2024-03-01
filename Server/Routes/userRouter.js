import express from "express";
import User from "../Model/userModel.js";

const app = express();
const router = express.Router();

app.use(express.json());

router.post("/register", async (req, res) => {

  try {
    const { name, email, number, password } = req.body;

    const user = new User({
      name,
      email,
      number,
      password,
    });

    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to save user");
  }
});

router.post('/login',async(req,res)=>{
  console.log(req.body)
  try{
    const{email, password}= req.body;

    const findUser=await User.findOne({email});

    if(findUser){
      if(findUser.password==password){
        console.log("Sucessfully login")
        res.status(200).json({mesg:"Sucessfully login"})
      }else{
        res.status(200).json({mesg:"password didn't match"})
      }
    }else{
      console.log("user not found")
      res.status(400)
    }
  }catch(err){
    console.log(err)
  }
})


app.use(router);

export default app;
