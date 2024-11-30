import { Todo } from "../model/todos.model.js";

// In the controller, we will define the functions that will be used in the routes.
// The controller will interact with the database using the model.
// The controller will also send responses to the client/view.

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}); //find all the todos in the database
    res.json(todos);
  } catch (error) {
    res.status(500).json({ succes: false, message: error.message });
  }
};

//Create a new todo
const createTodo = async (req, res) => {
  const todo = req.body; // Data that user sends in the request

  if (!todo.body || !todo.status == undefined) {
    return res
      .status(400)
      .json({ message: "Please fill in all the required fields" });
  }
  const newTodo = new Todo(todo); //create a new todo

  try {
    await newTodo.save(); //save the todo to the database
    res.status(201).json({ succes: true, data: newTodo }); //send the saved todo as a response
  } catch (error) {
    console.log("erro in creating product", error);
    res.status(500).json({ succes: false, message: error.message });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  const { id } = req.params; // takes the parameters in the url
  const updates = req.body; // Data that user sends in the request

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }); //find the todo by id and update it and return the updated todo, runValidators will check the schema for validation
    res.status(200).json({ succes: true, data: updatedTodo });
  } catch (error) {
    res.status(500).json({ succes: false, message: error.message });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params; // takes the parameters in the url
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id); //find the todo by id and delete it
    res.status(200).json({ succes: true, data: deletedTodo });
  } catch (error) {
    res.status(500).json({ succes: false, message: error.message });
  }
};

export { getTodos, createTodo, updateTodo, deleteTodo };
