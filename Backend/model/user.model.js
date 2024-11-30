import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";

//Schema over useer that stored in DB
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter a email"],
      validate: [isEmail, "Please enter a valid email"],
      trim: true, // removes all unecessary spaces
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimumpassword length is 6 charachters"], // Minimum lenght off
    },
  },
  { timestamps: true } // Adds createdAt och updatedAt
);

//Fires a function befores doc get saved to DB
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

export { User };
