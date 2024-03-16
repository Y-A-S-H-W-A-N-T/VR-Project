import express from "express";
import Property from "../Model/propertyModel.js";
import Request from '../Model/requestModel.js'

const app = express();
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("new",req.body)
  try {
    const newProperty = new Property({
      location: req.body.location,
      price: req.body.price,
      description: req.body.description,
      name: req.body.name,
      type: req.body.type,
      property_Image:req.body.property_Image,
      property_Proof: req.body.property_Proof,
      room_info: { 
        room_images: req.body.room_info.room_images,
        room_names: req.body.room_info.room_names,
      },
      userId:req.body.userId,
    });

    const savedProperty = await newProperty.save();
    console.log("Saved",savedProperty);
    res.status(200).json(savedProperty); 
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/showSellerProperty',async(req,res)=>{
  console.log('$$',req.body.userId)
  try {
    const properties = await Property.find({ userId: req.body.userId });
    console.log(properties)
    res.json(properties).status(200)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
})

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
  
  try{
    const temp = await Property.findOne({_id: req.body.id})
    // console.log(temp)
    const result = await Property.updateOne({_id:req.body.id},{ isVerified: true })
    res.status(200).json({ message: 'Property Verified'})
    console.log("Property Verified")
    // console.log(result)
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
      description: req.body.description,
      name: req.body.name,
      type: req.body.type,
      property_Image:req.body.property_Image,
      property_Proof: req.body.property_Proof,
      room_info: { 
        room_images: req.body.room_info.room_images,
        room_names: req.body.room_info.room_names,
      }
    }});
    // console.log(savedProperty);
    res.status(200).json(savedProperty); 
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/request',async(req,res)=>{
  console.log(req.body)
    try{
      const newRequest=new Request({
        PropertyId:req.body.Property_id,
        UserId:req.body.User_id,
      })

  const test = await newRequest.save()
  if(test){
    res.status(200).json({ message: 'OK'})
  }else{
    res.status(400).json({message:"Not saved"})
  }
  }catch(err){
    console.log(err)
  }
})

// Requested Properties

router.get('/showRequest', async (req, res) => {
  try {
    const requests = await Request.find()
    res.json(requests)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
})

router.post('/deleteRequest',async(req,res)=>{
  try{
    await Request.deleteOne(req.body)
    res.status(200)
  }
  catch(err)
  {
    console.log(err)
    res.status(400)
  }
  
})

router.get('/propertyDetails/:id',async(req,res)=>{
  const test = await Property.findOne({_id: req.params.id})
  console.log(test)
  res.json(test)
})

router.post('/save3D',async(req,res)=>{
  console.log("new",req.body)
  try {
    const newthreeD = new threeeD({
      Image_name: req.body.ImageName,
      Image_url: req.body.ImageUrl,
      
    });

    const savedthreeD = await newthreeD.save();
    console.log(savedthreeD);
    res.status(200).json(savedthreeD); 
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
})


app.use(router);

export default app;
