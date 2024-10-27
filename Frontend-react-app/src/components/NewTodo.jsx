import styles from "./NewTodo.module.css";
import { useState } from "react";
import PropTypes from "prop-types";

function NewTodo({ refreshTodoList }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //Bygger vårt todo objekt som ska skickas till DB
    const todoObject = {
      body: task,
      status: false,
      date: new Date(),
      dueDate: new Date(),
      priority: "medium",
    };

    //Funktion som skickar todoObject till databasen
    const sendTodoToDB = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoObject),
        });

        //Felhantering om det inte går att skicka todoObject till databasen
        if (!response.ok) {
          throw new Error("Failed to send todo to the server");
        }

        refreshTodoList(); //Värdelös funktion som tvingar TodoCardList att uppdatera sig
        setTask(""); // Rensar inputfältet
      } catch (error) {
        console.error("Error:", error);
      }
    };

    sendTodoToDB();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Add your todo"
          value={task}
          className={styles.inputForm}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className={styles.buttonForm}>
          <h4>ADD</h4>
        </button>
      </form>
    </div>
  );
}

NewTodo.propTypes = {
  refreshTodoList: PropTypes.func,
};

export default NewTodo;
