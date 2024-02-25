// Your Express route handler

import express from "express";
import Property from "../Model/roomsModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,"../client/src/images")
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000000 }, 
}).single("image");

app.use('/uploads', express.static(path.resolve('../client/src/images')));

router.post("/register", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    try {
      let imagePath = req.file ? req.file.filename : null;
      if (!imagePath) {
        return res.status(400).send("Image upload failed.");
      }

      const user = new Property({
        location: req.body.location,
        price: req.body.price,
        name: req.body.propName,
        type: req.body.Type,
        image: imagePath
      });

      

      const savedUser = await user.save();
      console.log(savedUser)
      if (savedUser) {
        return res.status(200).json(savedUser);
      } else {
        return res.status(500).send("Failed to save user");
      }
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).send("Internal Server Error");
    }
  });
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
