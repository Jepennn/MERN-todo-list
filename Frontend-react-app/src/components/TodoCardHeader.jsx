import PropTypes from "prop-types";
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import styles from "./TodoCardHeader.module.css";

function TodoCardHeader({ isChecked, deleteTodo, todoCompleted }) {
  return (
    <div className={styles.iconContainer}>
      <span onClick={todoCompleted}>
        {isChecked ? (
          <FaCheckCircle className={styles.checkedIcon} />
        ) : (
          <FaCheckCircle className={styles.unCheckedIcon} />
        )}
      </span>
      <FaTrashAlt
        size={15}
        className={`${styles.icon} ${styles.trashIcon}`}
        onClick={deleteTodo}
      />
    </div>
  );
}

TodoCardHeader.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todoCompleted: PropTypes.func.isRequired,
};

export default TodoCardHeader;
