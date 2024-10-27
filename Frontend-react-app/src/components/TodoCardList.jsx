import { useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import styles from "./TodoCardList.module.css";
import PropTypes from "prop-types";

function TodoCardList({ updateFlag, refreshTodoList }) {
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
  }, [updateFlag]); //Update flag är ett state som uppdateras i NewTodo-komponenten när en ny todo skapas

  //Här bygger vi våran lista med todos
  return (
    <div className={styles.gridContainer}>
      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          refreshTodoList={refreshTodoList}
          todoBody={todo.body}
          todoId={todo._id}
          todoStatus={todo.status}
        />
      ))}
    </div>
  );
}

TodoCardList.propTypes = {
  updateFlag: PropTypes.bool,
  refreshTodoList: PropTypes.func,
};

export default TodoCardList;
