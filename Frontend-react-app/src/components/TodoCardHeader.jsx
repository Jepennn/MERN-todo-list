import PropTypes from "prop-types";
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import styles from "./TodoCardHeader.module.css";
import { FaCircle } from "react-icons/fa";

function TodoCardHeader({
  isCompleted,
  onDeleteTodo,
  onTodoCompleted,
  todoFinshedAtDate,
  todoPriority,
}) {
  //Set priority symbol (red, yellow, green) based on the priority of the todo
  let priorityElement = null;
  if (todoPriority === "Low") {
    priorityElement = <FaCircle style={{ color: "green" }} />;
  } else if (todoPriority === "Medium") {
    priorityElement = <FaCircle style={{ color: "yellow" }} />;
  } else {
    priorityElement = <FaCircle style={{ color: "red" }} />;
  }

  return (
    <div className={styles.iconContainer}>
      <span onClick={onTodoCompleted}>
        {isCompleted ? (
          <FaCheckCircle className={styles.checkedIcon} />
        ) : (
          <FaCheckCircle className={styles.unCheckedIcon} />
        )}
      </span>
      <p className={styles.dueDateP}>
        Due date:{" "}
        <span
          className={`${styles.dueDateSpan} ${
            new Date(todoFinshedAtDate).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0)
              ? styles.dueDateExpiered
              : ""
          } ${isCompleted ? styles.dueDateTaskCompleted : ""}`}
        >
          {todoFinshedAtDate.split("T")[0]}
        </span>
      </p>
      <span className={styles.todoPriority}>
        Priority: {isCompleted ? "Task finshed" : priorityElement}
      </span>
      <FaTrashAlt
        size={15}
        className={`${styles.icon} ${styles.trashIcon}`}
        onClick={onDeleteTodo}
      />
    </div>
  );
}

TodoCardHeader.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onTodoCompleted: PropTypes.func.isRequired,
  todoFinshedAtDate: PropTypes.string,
  todoPriority: PropTypes.string,
};

export default TodoCardHeader;

//  ${isCompleted ? styles.descriptionCompleted : ""}`}
