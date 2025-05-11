import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const todoLists = models.todoList || model("todoLis", userSchema);
export default todoLists;
