import PropTypes from "prop-types";
import styles from "./TodoCard.module.css";
import TodoCardHeader from "./TodoCardHeader";
import { useState, useRef, useEffect } from "react";

function TodoCard({
  todoBody,
  todoId,
  refreshTodoList,
  todoStatus,
  todoDueDate,
  todoPriority,
}) {
  //State over todo completed/ not completed
  const [isCompleted, setIsCompleted] = useState(todoStatus);
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [newTodoBody, setNewTodoBody] = useState(todoBody);
  const inputRef = useRef(null); // Referens till input-elementet som används vid redigering av todo

  // Function that focuses the input field when the component is rendered
  useEffect(() => {
    if (isEditingTodo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingTodo]);

  // Function that handles the change of the edited todo
  function handleEditChange(e) {
    setNewTodoBody(e.target.value);
  }

  // Function that handles the save of the edited todo
  async function handleSaveEdit() {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: newTodoBody }), // Uppdatera body i databasen
      });

      if (!response.ok) {
        throw new Error("Failed to update todo in the database");
      }

      setIsEditingTodo(false); // Stäng redigeringsläget
      refreshTodoList(); // Uppdatera listan
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

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
      {isEditingTodo ? ( // Om redigeringsläge
        <input
          ref={inputRef}
          type="text"
          value={newTodoBody}
          onChange={handleEditChange}
          onBlur={handleSaveEdit} // Spara ändring vid förlust av fokus
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSaveEdit(); // Spara ändring vid Enter
          }}
          className={styles.editInput}
        />
      ) : (
        <p
          className={`
            ${styles.description} 
            ${isCompleted ? styles.descriptionCompleted : ""}`}
          onClick={() => setIsEditingTodo(true)} // Gå till redigeringsläge vid klick
        >
          {newTodoBody} {/* Visa `newTodoBody` */}
        </p>
      )}
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
