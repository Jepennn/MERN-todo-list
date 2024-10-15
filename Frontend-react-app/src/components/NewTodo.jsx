import styles from "./NewTodo.module.css";

function NewTodo() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label htmlFor="todoInfo">Add Todo</label>
        <textarea id="todoInfo" />
      </form>
    </div>
  );
}

export default NewTodo;
