import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./controller/todos.controller.js";
import {
  signedUp_post,
  login_post,
  logout_get,
} from "./controller/auth.controller.js";

//Load environment variables so that they can be used in the application
dotenv.config();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-production-frontend.com",
  "https://mern-todo-list-frontend-tau.vercel.app",
  "https://mern-todo-list-frontend-hn34f6x0h-jespers-projects-d7ce381a.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

//Middleware functions that will run for every request so that the data can be used in the req.body
app.use(express.json());
app.use(cookieParser());

//Import of middleware that checks if the user is logged in
import { authMiddleware } from "./middleware/authMiddleware.js";

const port = process.env.PORT || 3000;
connectDB()
  .then(() => {
    //starts the server
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port} 
      // ----------------------------------------------------------------//`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
  });

/*Todo routes starts here*/

//Redirect to /todos
app.get("/", (req, res) => {
  res.redirect("/todos");
});

/*ROUTES OVER TODOS */
app.get("/todos", authMiddleware, getTodos);
app.post("/todos", authMiddleware, createTodo);
app.put("/todos/:id", authMiddleware, updateTodo);
app.delete("/todos/:id", authMiddleware, deleteTodo);

/*ROUTES OVER AUTH*/
// app.get("/signup", signUp_get);
app.post("/signup", signedUp_post);

// app.get("/login", login_get);
app.post("/login", login_post);

app.get("/logout", logout_get);

/*ROUTES OVER CHECK AUTH */
app.get("/check-auth", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});
