import express from "express";
import Property from "../Model/propertyModel.js";

const app = express();
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("new",req.body)
  try {
    const newProperty = new Property({
      location: req.body.location,
      price: req.body.price,
      name: req.body.name,
      type: req.body.type,
      property_Image:req.body.property_Image,
      room_info: { 
        room_images: req.body.room_info.room_images,
        room_names: req.body.room_info.room_names,
      }
    });

    const savedProperty = await newProperty.save();
    console.log(savedProperty);
    res.status(200).json(savedProperty); 
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/show', async (req, res) => {
  try {
    const properties = await Property.find()
    res.json(properties)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
})

router.post('/verifyProperty',async(req, res)=>{
  console.log("Property ID : ",req.body.id)
  try{
    const temp = await Property.findOne({_id: req.body.id})
    console.log(temp)
    const result = await Property.updateOne({_id:req.body.id},{ isVerified: true })
    res.status(200).json({ message: 'Property Verified'})
    console.log("Property Verified")
    console.log(result)
  }
  catch(err)
  {
    console.log(err)
  }
})

router.post('/deleteProperty',async(req,res)=>{
  console.log(req.body.id)
  const result = await Property.deleteOne({_id: req.body.id})
  result.acknowledged? res.status(200).json({ message: 'Property Deleted Succesfully' }) : res.status(400).json({ message: 'Error in Deleteing Property' })
})

router.post("/updateProperty", async (req, res) => {
  console.log("new",req.body)
  try {
      const savedProperty = await Property.updateOne({ _id : req.body.id},{$set: {
      location: req.body.location,
      price: req.body.price,
      name: req.body.name,
      type: req.body.type,
      property_Image:req.body.property_Image,
      room_info: { 
        room_images: req.body.room_info.room_images,
        room_names: req.body.room_info.room_names,
      }
    }});
    console.log(savedProperty);
    res.status(200).json(savedProperty); 
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});



app.use(router);

export default app;
