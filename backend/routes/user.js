const { Router } = require("express");
const router = Router();
const {
  validateMiddleware,
  userSchema,
  todoSchema,
  signinSchema,
} = require("../middleware/validateMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const { User, Todo } = require("../db");
const JWT_SECRET = require("../config");

// Signup Route
router.post("/signup", validateMiddleware(userSchema), async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  try {
    const response = await User.findOne({ username });
    if (response) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      password,
    });

    // Sign the token with the MongoDB _id
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "User Created Successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Error Occurred",
    });
  }
});

// Signin Route
router.post("/signin", validateMiddleware(signinSchema), async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await User.findOne({ username, password });
    if (!response) {
      return res.status(400).json({
        message: "No User Found with the credentials",
      });
    }

    const token = jwt.sign({ userId: response._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "User Signin Successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Error Occurred",
    });
  }
});

// Get Todos Route
router.get("/todos", authMiddleware(), async (req, res) => {
  const userId = req.userId;

  try {
    const todos = await User.findById().populate("todos");

    if (!todos) {
      return res.status(400).json({
        message: "No User found with todos",
      });
    }

    return res.status(200).json(todos.todos);
  } catch (error) {
    return res.status(500).json({
      message: "Some Error Occured",
    });
  }
});

router.post(
  "/addTodo",
  authMiddleware(),
  validateMiddleware(todoSchema),
  async (req, res) => {
    const userId = req.userID;
    const { title, description, completed } = req.body;

    try {
      const newTodo = await Todo.create({
        title,
        description,
        completed,
      });

      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { todos: newTodo._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Return a success response
      return res.status(201).json({
        message: "Todo added successfully",
        todo: newTodo,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Some Error Occured",
      });
    }
  }
);

// OTHER WAY TO GET TODOS

// app.get("/todos/:userId", async (req, res) => {
//   const userId = req.params.userId; // Extract userId from request params

//   try {
//     // Step 1: Find the user by their ID
//     const user = await User.findById(userId);

//     // If the user is not found
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Step 2: Fetch the todos from the Todo collection using the array of ObjectId(s)
//     const todos = await Todo.find({ _id: { $in: user.todos } });

//     // Return the fetched todos
//     return res.status(200).json(todos);
//   } catch (error) {
//     // Catch any errors and send a 500 response
//     return res.status(500).json({ message: "Some error occurred", error });
//   }
// });

router.put(
  "/updateTodo",
  authMiddleware(),
  validateMiddleware(todoSchema),
  async (req, res) => {
    const { id, title, description } = req.body;

    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { title, description }, // Correct format for the update object
        { new: true } // Options should be passed here
      );

      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: "Failed to update todo" });
    }
  }
);

router.delete("/complete", authMiddleware(), async (req, res) => {
  const { id } = req.body; // Extract the todo id from the request body

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id); // Find and delete the todo by id

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = router;
