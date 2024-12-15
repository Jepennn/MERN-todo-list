import TodoCardList from "./components/TodoCardList";
import styles from "./App.module.css";
import NewTodo from "./components/NewTodo";
import MainHeader from "./components/Mainheader";
import Modal from "./components/Modal";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [updateFlag, setUpdateFlag] = useState(false);

  // Funktion för att tvinga en omrendering av TodoCardList
  const refreshTodoList = () => {
    setUpdateFlag(!updateFlag);
  };

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Routes>
          {/* Route för att logga in */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />

          {/* Route för att visa alla todos */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/todos"
              element={
                <>
                  <MainHeader />
                  <TodoCardList
                    updateFlag={updateFlag}
                    reRenderTodoList={refreshTodoList}
                  />
                </>
              }
            />
            <Route
              path="/new-todo"
              element={
                <>
                  <MainHeader />
                  <TodoCardList
                    updateFlag={updateFlag}
                    reRenderTodoList={refreshTodoList}
                  />
                  <Modal>
                    <NewTodo refreshTodoList={refreshTodoList} />
                  </Modal>
                </>
              }
            />
          </Route>

          {/* Route för att visa 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
