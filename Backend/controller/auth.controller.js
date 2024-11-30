import { User } from "../model/user.model.js";
import mongoose from "mongoose";

//Function that extracts error messages specified in MongoDB model user
function handleError(err) {
  let errors = { email: "", password: "" };

  //duplicate error code, if email already exist in DB
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    //validate errors
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

const signedUp_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

const login_get = (req, res) => {
  res.send("Login form");
};

const signUp_get = async (req, res) => {};
const login_post = (req, res) => {
  res.send("User just loged in");
};

export { signUp_get, signedUp_post, login_get, login_post };
