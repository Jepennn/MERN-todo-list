import PropTypes from "prop-types";
import styles from "./TodoCard.module.css";
import { useState } from "react";
import TodoCardHeader from "./TodoCardHeader";

function TodoCard({ todoBody, todoId, refreshTodoList, todoStatus }) {
  const [isChecked, setIsChecked] = useState(todoStatus);

  function todoCompleted() {
    async function todoStatus() {
      try {
        const newStatus = !isChecked; // Vänd det nuvarande värdet här
        setIsChecked(newStatus);

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
    todoStatus();
  }

  //Funktion som raderar todoTask
  function deleteTodo() {
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
        isChecked={isChecked}
        todoCompleted={todoCompleted}
        deleteTodo={deleteTodo}
      />
      <p
        className={`${styles.description} ${
          isChecked ? styles.descriptionCompleted : ""
        }`}
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
};

export default TodoCard;
