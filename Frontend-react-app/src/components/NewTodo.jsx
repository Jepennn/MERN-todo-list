import styles from "./NewTodo.module.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function NewTodo({ refreshTodoList }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    //Förhindrar att skicka tomma Todos
    if (task.trim() == "") {
      console.log("Vi kan inte skicka tomma todos");
      setTask("");
      return 0;
    }

    //Bygger vårt todo objekt som ska skickas till DB
    const todoObject = {
      body: task,
      status: false,
      date: new Date(),
      dueDate: new Date(dueDate),
      priority: priority,
    };

    //Funktion som skickar todoObject till databasen
    const sendTodoToDB = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos", {
          method: "POST",
          credentials: "include",
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
        setDueDate(""); // Rensar inputfältet
        setPriority("M"); // Rensar inputfältet
      } catch (error) {
        console.error("Error:", error);
      }
    };

    sendTodoToDB();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.topBar}>
        <Link to={"/todos"}>X</Link>
      </div>
      <div className={styles.upperInputDiv}>
        <input
          name="task"
          required
          type="text"
          placeholder="Add your todo"
          value={task}
          className={styles.inputFormText}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className={styles.buttonForm}>
          <h4>ADD</h4>
        </button>
      </div>
      <div className={styles.lowerInputDiv}>
        <div className={styles.inputGroup}>
          <label htmlFor="dueDate" className={styles.labelForm}>
            Due date:
          </label>
          <input
            id="dueDate"
            name="dueDate"
            required
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={styles.inputFormDate}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="priority" className={styles.labelForm}>
            Priority:
          </label>
          <select
            id="priority"
            required
            value={priority}
            name="priority"
            className={styles.selectForm}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
    </form>
  );
}

NewTodo.propTypes = {
  refreshTodoList: PropTypes.func,
};

export default NewTodo;
