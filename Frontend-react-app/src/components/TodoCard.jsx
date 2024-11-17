import PropTypes from "prop-types";
import styles from "./TodoCard.module.css";
import { useState } from "react";
import TodoCardHeader from "./TodoCardHeader";

function TodoCard({
  todoBody,
  todoId,
  refreshTodoList,
  todoStatus,
  todoDueDate,
  todoPriority,
}) {
  //State over todo completed or NOT
  const [isCompleted, setIsCompleted] = useState(todoStatus);

  //Function that handle/switches complete icon and store i the database
  function handleTodoCompleted() {
    async function changeTodoStatus() {
      try {
        const newStatus = !isCompleted; // Flips the completed state if
        setIsCompleted(newStatus);

        const obj = {
          status: newStatus,
        };

        const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });

        if (!response.ok) {
          throw new Error("Failed to change status in databas");
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
    changeTodoStatus();
  }

  //Function that deletes todoTask and remove i from the database
  function handleDeleteTodo() {
    const deleteTodoFromDB = async () => {
      try {
        const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
          method: "DELETE",
        });

        //För att hamna i catch-blocket vid fel
        if (!response.ok) {
          throw new Error("Failed to delete todo from the server");
        }

        refreshTodoList(); //Värdelös funktion som tvingar TodoCardList att uppdatera sig
      } catch (error) {
        alert("Failed to delete todo");
        console.error("Error:", error);
      }
    };

    deleteTodoFromDB();
  }

  return (
    <div className={styles.todoCard}>
      <TodoCardHeader
        isCompleted={isCompleted}
        onTodoCompleted={handleTodoCompleted}
        onDeleteTodo={handleDeleteTodo}
        todoFinshedAtDate={todoDueDate}
        todoPriority={todoPriority}
      />
      <p
        className={`
          ${styles.description} 
          ${isCompleted ? styles.descriptionCompleted : ""}`}
      >
        {todoBody}
      </p>
    </div>
  );
}

TodoCard.propTypes = {
  todoBody: PropTypes.string.isRequired,
  todoId: PropTypes.string.isRequired,
  refreshTodoList: PropTypes.func.isRequired,
  todoStatus: PropTypes.bool.isRequired,
  todoDueDate: PropTypes.string,
  todoPriority: PropTypes.string,
};

export default TodoCard;
