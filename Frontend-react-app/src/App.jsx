import TodoComponent from "./components/TodoComponent";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import NewTodo from "./components/NewTodo";
import MainHeader from "./components/Mainheader";

function App() {
  return (
    <div className={styles.container}>
      <MainHeader />
      {/* <NavBar /> */}
      <TodoComponent />
      <NewTodo />
    </div>
  );
}

export default App;
