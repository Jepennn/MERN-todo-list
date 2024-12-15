import { useState } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <h1 className={styles.headingLogin}>Todo App</h1>
      <form onSubmit={signUpHandler}>
        <h2>Sign up</h2>
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
          Sign up
        </button>
      </form>
    </>
  );

  //Function that handles the sign up form
  async function signUpHandler(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      //If the response is not ok, set the error messages and display them
      if (!response.ok) {
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
        console.log(data);
        return;
      }

      //If the response is ok, redirect to the login page
      if (response.ok && data.user) {
        navigate("/todos");
      }

      //Nollsätter fälten
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
