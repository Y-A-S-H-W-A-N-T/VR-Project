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
    const properties = await Property.find();
  
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.use(router);

export default app;
