import PropTypes from "prop-types";
import styles from "./TodoCard.module.css";
import { CiCircleCheck } from "react-icons/ci";

function TodoCard({ todoBody }) {
  return (
    <div className={styles.todoCard}>
      <CiCircleCheck className={styles.icon} />
      <p className={styles.description}>{todoBody}</p>
    </div>
  );
}

TodoCard.propTypes = {
  todoBody: PropTypes.string.isRequired,
};

export default TodoCard;
