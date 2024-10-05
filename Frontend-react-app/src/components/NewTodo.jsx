import styles from "./NewTodo.module.css";

function NewTodo() {
  return (
    <form className={styles.form}>
      <p>
        <label htmlFor="body">Add your Todo</label>
        <textarea id="body" />
      </p>
    </form>
  );
}

export default NewTodo;
