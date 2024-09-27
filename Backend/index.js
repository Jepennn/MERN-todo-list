import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./controller/todos.controller.js";

dotenv.config(); //load env variables

const app = express();
app.use(express.json()); //middleware to parse json data so that it can be used in the req.body
app.use(cors()); //middleware to allow cross-origin requests

const port = process.env.PORT || 3000;
connectDB()
  .then(() => {
    //starts the server
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
  });

/*Todo routes starts here*/
app.get("/", (req, res) => {
  res.redirect("/todos");
});

//Done
app.get("/todos", getTodos);
//Done
app.post("/todos", createTodo);
//Done
app.put("/todos/:id", updateTodo);

app.delete("/todos/:id", deleteTodo);
