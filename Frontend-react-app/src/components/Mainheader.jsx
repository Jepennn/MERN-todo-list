import PropTypes from "prop-types";
import { MdPostAdd } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import styles from "./MainHeader.module.css";

function MainHeader({ onNewPostClick }) {
  // Get the innerWidth of the window and based on that sets the text of the add button
  const { innerWidth } = window;

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <LuListTodo />
        Todo List
      </h1>
      <p>
        <button onClick={onNewPostClick} className={styles.button}>
          <MdPostAdd size={20} className={styles.addIcon} />
          {innerWidth > 550 ? "New Todo" : ""}
        </button>
      </p>
    </header>
  );
}

MainHeader.propTypes = {
  onNewPostClick: PropTypes.func,
};

export default MainHeader;
