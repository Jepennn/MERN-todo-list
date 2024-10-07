import { useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import styles from "./TodoCardList.module.css";

function TodoCardList() {
  const [todos, setTodos] = useState([]);

  // useEffect gets called after the first render an get all todos from the server
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []); // Tom beroendelista

  return (
    <div className={styles.gridContainer}>
      {todos.map((todo) => (
        <TodoCard key={todo._id} todoBody={todo.body} />
      ))}
    </div>
  );
}

export default TodoCardList;
