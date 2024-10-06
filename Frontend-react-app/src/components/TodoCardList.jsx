import TodoCard from "./TodoCard";
import styles from "./TodoCardList.module.css";

function TodoCardList() {
  return (
    <div className={styles.gridContainer}>
      <TodoCard />
      <TodoCard />
      <TodoCard />
      <TodoCard />
      <TodoCard />
      <TodoCard />
    </div>
  );
}

export default TodoCardList;
