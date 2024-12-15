import { Todo } from "../model/todos.model.js";

// In the controller, we will define the functions that will be used in the routes.
// The controller will interact with the database using the model.
// The controller will also send responses to the client/view.

// Get all todos for the logged-in user
const getTodos = async (req, res) => {
  const userId = req.user.id; // Hämta userId från authMiddleware

  try {
    const todos = await Todo.find({ userId }); // Hämta endast todos för inloggad användare
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    console.error("Error fetching todos", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  const { body, status, dueDate, priority } = req.body; // Data från request body
  const userId = req.user.id; // Hämta userId från authMiddleware

  if (!body || status === undefined) {
    return res
      .status(400)
      .json({ message: "Please fill in all the required fields" });
  }

  // Skapa en ny todo och koppla till userId
  const newTodo = new Todo({
    body,
    status,
    dueDate,
    priority,
    userId, // Koppla todo till den inloggade användaren
  });

  try {
    await newTodo.save(); // Spara todo i databasen
    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    console.error("Error in creating todo", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  const { id } = req.params; // ID:t för todo som ska uppdateras
  const { body } = req.body; // Nytt body-värde från requesten
  const userId = req.user.id; // Inloggad användares ID från authMiddleware

  try {
    // Hitta todo och verifiera att den tillhör användaren
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.userId.toString() !== userId) {
      return res.status(403).json({
        message: "Forbidden: You are not allowed to update this todo",
      });
    }

    // Uppdatera todo med det nya body-värdet
    todo.body = body || todo.body;
    const updatedTodo = await todo.save();

    res.status(200).json({ success: true, data: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).json({ success: false, message: "Failed to update todo" });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params; // ID:t för todo som ska raderas
  const userId = req.user.id; // Inloggad användares ID från authMiddleware

  try {
    // Hitta todo och verifiera att den tillhör användaren
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.userId.toString() !== userId) {
      return res.status(403).json({
        message: "Forbidden: You are not allowed to delete this todo",
      });
    }

    // Radera todo
    await todo.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete todo" });
  }
};

export { getTodos, createTodo, updateTodo, deleteTodo };
