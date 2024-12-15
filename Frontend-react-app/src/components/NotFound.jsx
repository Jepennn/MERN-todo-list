import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.message}>
        Oops! The page you&apos;re looking for doesn&apos;t exist
      </p>
      <Link to="/todos" className={styles.link}>
        Log In
      </Link>
    </div>
  );
}
