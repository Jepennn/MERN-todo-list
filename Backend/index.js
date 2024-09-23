import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./db.js";
import { Todo } from "./model/todos.model.js";

dotenv.config(); //load env variables

const app = express();
app.use(express.json()); //middleware to parse json data so that it can be used in the req.body

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

// Todo routes starts here
app.get("/", (req, res) => {
  res.redirect("/todos");
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find(); //returns all the todos
  } catch (error) {
    res.status(500).json({ succes: false, message: error.message });
  }
});

app.post("/todos", (req, res) => {
  try {
  } catch {}
  res.json({ message: "Created a todo" });
});
