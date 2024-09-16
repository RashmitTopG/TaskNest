const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/basicTodoApp");

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const TodoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  User,
  Todo,
};
