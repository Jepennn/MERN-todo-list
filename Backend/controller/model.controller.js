import mongoose from "mongoose";
import { Todo } from "../model/todos.model.js";

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos); //returns all the todos in the database
  } catch (error) {
    res.status(500).json({ succes: false, message: error.message });
  }
};

//Create a new todo
export const createTodo = async (req, res) => {
  try {
  } catch {}
};
