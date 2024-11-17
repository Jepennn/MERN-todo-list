import TodoCardList from "./components/TodoCardList";
import styles from "./App.module.css";
import NewTodo from "./components/NewTodo";
import MainHeader from "./components/Mainheader";
import Modal from "./components/Modal";
import { useState } from "react";
function App() {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  /*-----------------------------------------------------------*/
  //Functiom that forces a reRender of the TodoCardList component
  const refreshTodoList = () => {
    setUpdateFlag(!updateFlag);
  };
  /*-----------------------------------------------------------*/

  //Function that handels our Modal that contains our newTodo form
  const handleModelToggler = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.app}>
      <MainHeader onNewPostClick={handleModelToggler} />
      {isModalOpen ? (
        <Modal onCloseModal={handleModelToggler}>
          <NewTodo refreshTodoList={refreshTodoList} />
        </Modal>
      ) : (
        ""
      )}

      <TodoCardList
        updateFlag={updateFlag}
        reRenderTodoList={refreshTodoList}
      />
    </div>
  );
}

export default App;
