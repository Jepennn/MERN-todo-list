import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";

//Function that extracts error messages specified in MongoDB model user
function handleError(err) {
  let errors = { email: "", password: "" };

  //Error handling for incorrect email and when logging in
  if (err.message === "Incorrect email") {
    errors.email = "Email not registered";
  }

  //Error handling for incorrect password when logging in
  if (err.message === "Incorrect password") {
    errors.password = "Incorrect password";
  }

  //Error handling for duplicate email when signing up
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  //Error handling for validation errors when signing up
  if (err.message.includes("user validation failed")) {
    //validate errors
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

//This function creates a token with the user id and secret key and sets the expiration time to 3 hours
// and returns the token
const maxTime = 3 * 60 * 60; //3 hours
function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxTime,
  });
}

const signedUp_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id); //create a token based on the user id
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxTime * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production", // Säkert för produktion
    }); //set the token in a cookie
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

// const login_get = (req, res) => {
//   res.send("Login form");
// };

// const signUp_get = async (req, res) => {};

const login_post = async (req, res) => {
  const { email, password } = req.body; //get the email and password from the request body

  try {
    const user = await User.login(email, password); //try to login the user
    const token = createToken(user._id); //create a token based on the user id
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxTime * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
    }); //set the token in a cookie
    res.status(200).json({ user: user._id }); //return the user id
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json({ errors });
  }
};

//Function that deletes the cookie and logs out the user.(We overwrite the cookie with an empty string and set the maxAge to 1ms)
const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }); //delete the cookie
};

export { signedUp_post, login_post, logout_get };
