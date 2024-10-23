import styles from "./NewTodo.module.css";
import { useState } from "react";

function NewTodo() {
  const [todo, setTodo] = useState("Hej världen");

  // const handleChange = (e) => {
  //   setTodo(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todo);
    setTodo(" ");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          id="todoInfo"
          placeholder="Add your todo"
          className={styles.inputForm}
        />
        <button onClick={handleSubmit} className={styles.buttonForm}>
          Add
        </button>
      </form>
    </div>
  );
}

export default NewTodo;
