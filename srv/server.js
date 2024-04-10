import app from "./app.js";
import mongoose from "mongoose";
import { config } from "dotenv";
import cloudinary from "cloudinary";
config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("Connected to port 1000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
