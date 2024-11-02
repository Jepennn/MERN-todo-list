import PropTypes from "prop-types";
import { MdPostAdd } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import styles from "./MainHeader.module.css";

function MainHeader({ onNewPostClick }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <LuListTodo />
        Todo List
      </h1>
      <p>
        <button onClick={onNewPostClick} className={styles.button}>
          <MdPostAdd size={18} className={styles.addIcon} />
          New Post
        </button>
      </p>
    </header>
  );
}

MainHeader.propTypes = {
  onNewPostClick: PropTypes.func,
};

export default MainHeader;
