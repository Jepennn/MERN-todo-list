import { MdPostAdd, MdMessage } from "react-icons/md";
import styles from "./MainHeader.module.css";

function MainHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <MdMessage />
        Todo List
      </h1>
      <p>
        <button className={styles.button}>
          <MdPostAdd size={18} />
          New Post
        </button>
      </p>
    </header>
  );
}

export default MainHeader;
