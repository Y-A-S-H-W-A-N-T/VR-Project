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
        const {_id, isAdmin}=findUser
        console.log("Details",_id, isAdmin)
        res.status(200).json({_id, isAdmin})
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
  const test = await User.findOne({_id : req.body.userID})
  console.log(test)
  try {
    const user = await User.findOne({ _id:req.body.userID });
    console.log("user details",user);
    
    const update = await User.updateOne({ _id: req.body.userID }, { $push: { showProperty: req.body.propertyID } });
    console.log(update);

    if (update.acknowledged) {
      console.log('updated');
      const updatedUser = await User.findById(req.body.userID);
      console.log(updatedUser);
      res.status(200).json({ message: 'Updated successfully', user: updatedUser });
    } else {
      console.log('Not updated');
      res.status(400).json({ message: 'Failed to update' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
})


router.post('/showCustomProperty', async (req, res) => {
  try {
    if (req.body.userId==null) {
      res.status(400)
    }else{
      const response = await User.findById(req.body.userId)
      console.log(response)
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
  
        res.status(200).json(addProp);
      } else {
        res.status(404).json({ message: 'User not found' });
      }

    }
   
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/userData', async (req, res) => {
  try {
      const { userId } = req.body;
      
      if (!userId) {
          return res.status(400).json({ error: 'userId is required' });
      }

      const userData = await User.findOne({_id:req.body.userId});
       console.log(userData)
      if (!userData) {
          return res.status(404).json({ error: 'User not found' });
      }else{
        console.log("------------------------",userData)
         res.status(200).json(userData);
      }

      
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
})

app.use(router);

export default app;
