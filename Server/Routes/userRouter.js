import express from "express";
import User from "../Model/userModel.js";
import multer from "multer";
import path from "path"; 

const app = express();
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,"../client/src/images")
  },
  filelocation: function (req, file, cb) {
    cb(
      null,file.fieldlocation + "-" + Date.now() + path.extlocation(file.originalname)
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
      res.status(500).send(err);
      console.error(err);
    } else {
      try {
        let imagePath = req.file ? req.file.filelocation : null;

        if (!imagePath) {
          return res.status(400).send("Image upload failed.");
        }

        const user = new User({
          name: req.body.name,
          email: req.body.email,
          number: req.body.number,
          password: req.body.password,
          image: imagePath, 
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
    }
  });
});


app.use(router);

export default app;
