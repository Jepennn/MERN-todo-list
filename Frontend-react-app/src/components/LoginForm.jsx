import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <h1 className={styles.headingLogin}>Todo App</h1>
      <form onSubmit={loginHandler}>
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          className={styles.inputField}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p style={{ color: "red", fontSize: "12px", width: "100%" }}>
          {emailError}
        </p>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          className={styles.inputField}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p style={{ color: "red", fontSize: "12px", width: "100%" }}>
          {passwordError}
        </p>
        <button type="submit" className={styles.submitButton}>
          Log in
        </button>
        <p>
          Don&apos;t have an account?{" "}
          <Link to="/signup" className={styles.link}>
            Sign up
          </Link>
        </p>
      </form>
    </>
  );

  // Function to handle the login form submission
  async function loginHandler(e) {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      // If the response is not ok, set the error messages and display them
      if (!response.ok) {
        if (data.errors) {
          setEmailError(data.errors.email || "");
          setPasswordError(data.errors.password || "");
        }
        return;
      }

      // If the response is ok, redirect to the todos page
      if (response.ok && data.user) {
        navigate("/todos");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
