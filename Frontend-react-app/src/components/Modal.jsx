import PropTypes from "prop-types";
import styles from "./Modal.module.css";

export default function Modal({ closeModal, children }) {
  //Easy function that stops event to bubble up to overlay
  function stopBubblingEvent(e) {
    e.stopPropagation();
  }

  return (
    <div onClick={closeModal} className={styles.overlay}>
      <div className={styles.modal} onClick={stopBubblingEvent}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func,
};
