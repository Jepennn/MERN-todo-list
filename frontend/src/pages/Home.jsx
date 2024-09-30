import { useEffect, useState } from "react";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //fetching todos from the backend server
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");
        const data = await response.json();
        console.log(data);
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      {todos && todos.map((todo) => <div key={todo._id}>{todo.body}</div>)}
    </div>
  );
}

export { Home };
