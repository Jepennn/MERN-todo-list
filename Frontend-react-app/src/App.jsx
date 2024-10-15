import TodoCardList from "./components/TodoCardList";
import styles from "./App.module.css";
import NewTodo from "./components/NewTodo";
import MainHeader from "./components/Mainheader";

function App() {
  return (
    <div className={styles.app}>
      <MainHeader />
      <TodoCardList />
      <NewTodo />
    </div>
  );
}

export default App;
