import PropTypes from "prop-types";
import { MdPostAdd } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styles from "./MainHeader.module.css";

function MainHeader() {
  const navigation = useNavigate();

  function newPostHandler() {
    navigation("/new-todo");
  }

  async function logoutHandler() {
    try {
      console.log(" hello from Logging out");
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigation("/login");
      } else {
        throw new Error("Failed to logout");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.leftHeadingContainer}>
        <LuListTodo size={36} />
        <h1>Todo List</h1>
      </div>
      <div className={styles.rightHeadingContainer}>
        <MdPostAdd onClick={newPostHandler} size={40} />
        <IoLogOut onClick={logoutHandler} size={40} />
      </div>
    </header>
  );
}

MainHeader.propTypes = {
  onNewPostClick: PropTypes.func,
};

export default MainHeader;
