import { MdPostAdd } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import styles from "./MainHeader.module.css";

function MainHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <LuListTodo />
        Todo List
      </h1>
      <p>
        <button className={styles.button}>
          <MdPostAdd size={18} className={styles.addIcon} />
          New Post
        </button>
      </p>
    </header>
  );
}

export default MainHeader;
