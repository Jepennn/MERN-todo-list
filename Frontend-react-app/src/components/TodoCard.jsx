import styles from "./TodoCard.module.css";
import { CiCircleCheck } from "react-icons/ci";

function TodoCard() {
  return (
    <div className={styles.todoCard}>
      <CiCircleCheck className={styles.icon} />
      <p className={styles.description}>Det här är min första todo</p>
    </div>
  );
}

export default TodoCard;
