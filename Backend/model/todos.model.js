// Exporting the Todo model to be used in the controller
import mongoose from "mongoose";
import { Schema } from "mongoose";

//Schema over Todos that get stored in out DB

const todoSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export { Todo };
