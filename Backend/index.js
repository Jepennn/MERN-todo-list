import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./db.js";

dotenv.config(); //load env variables

const app = express();

const port = process.env.PORT || 3000;
connectDB()
  .then(() => {
    //starts the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
  });

//routes start here
app.get("/", (req, res) => {
  res.redirect("/todos");
});
