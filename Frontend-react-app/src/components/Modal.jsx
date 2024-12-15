import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

export default function Modal({ children }) {
  // Easy function that stops event to bubble up to overlay.
  //Stops the modal to close when clicking det children that the
  //Model show us.
  function stopBubblingEvent(e) {
    e.stopPropagation();
  }

  // Function to close the modal when clicking the overlay. We switch URL to /todos
  const navigate = useNavigate();
  function onCloseModal() {
    navigate("/todos");
  }

  return (
    <div onClick={onCloseModal} className={styles.overlay}>
      <div className={styles.modal} onClick={stopBubblingEvent}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onCloseModal: PropTypes.func,
};
