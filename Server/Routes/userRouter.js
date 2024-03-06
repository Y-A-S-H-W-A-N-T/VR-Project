import express from "express";
import User from "../Model/userModel.js";
import Property from "../Model/propertyModel.js"
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
        const id=findUser._id
        console.log(id)
        res.status(200).json(id)
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


router.get('/show',async(req,res)=>{
  try {
    const properties = await User.find();
    const data=properties.map(property=>({
       _id: property._id,
       name: property.name,
       email: property.email,
    }))
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/updateProperty',async(req,res)=>{
  try {
    const update=await User.updateOne({_id:req.body.userID},{$push:{showProperty:req.body.propertyID}})
    if(update){
      res.status(200)
      console.log('updated')
      const user= await User.findById({_id:req.body.userID})
      console.log(user)
    }else{
      res.status(400)
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.get('/showCustomProperty/:id', async (req, res) => {
  if (req.params.id==null) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }
  console.log('--------------------------------------------------------------------',req.params.id)
  try {
    if (!req.params.id) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }
    const response = await User.findById(req.params.id)
    if (response) {
      const addProp = [];
      const property = response.showProperty;

      for (const propertyId of property) {
        if (propertyId) {
          const prop = await Property.findById(propertyId);
          if (prop) {
            addProp.push(prop);
          } else {
            console.log(`Invalid property ID: ${propertyId}`);
          }
        } else {
          console.log(`Invalid property ID: ${propertyId}`);
        }
      }
      console.log("Ye sare properties hai : ",addProp)

      res.status(200).json(addProp);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});



app.use(router);

export default app;
