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

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {});

    return res.status(200).json({
      message: "User Created Successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    console.error("Error during signup:", error); // Log the error details
    return res.status(500).json({
      message: "Some Error Occurred",
      success: false,
      error: error.message, // Include error message in response for debugging
    });
  }
});

// Signin Route
router.post("/login", validateMiddleware(signinSchema), async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await User.findOne({ username, password });
    if (!response) {
      return res.status(400).json({
        message: "No User Found with the credentials",
        success: false,
      });
    }

    const token = jwt.sign({ userId: response._id }, JWT_SECRET, {});

    return res.status(200).json({
      message: "User Signed In Successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Error Occurred",
    });
  }
});

// Get Todos Route
router.get("/todos", authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate("todos"); // Use userId here

    if (!user) {
      return res.status(400).json({
        message: "No User found with todos",
      });
    }

    return res.status(200).json({
      todos: user.todos,
    });
  } catch (error) {
    console.error("The error is " + error);
    return res.status(500).json({
      message: "Some Error Occurred",
      error: error.message,
    });
  }
});

// Add Todo Route
router.post(
  "/addTodo",
  authMiddleware,
  validateMiddleware(todoSchema),
  async (req, res) => {
    const userId = req.userId; // Corrected to match the field set by authMiddleware
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
        message: "Some Error Occurred",
      });
    }
  }
);

// Update Todo Route
router.put(
  "/updateTodo",
  authMiddleware,
  validateMiddleware(todoSchema),
  async (req, res) => {
    const { id, title, description, completed } = req.body;

    try {
      // Create an update object based on which fields are present
      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (completed !== undefined) updateData.completed = completed;

      const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: "Failed to update todo" });
    }
  }
);

router.put("/completeTodo/:id", authMiddleware, async (req, res) => {
  const { id } = req.params; // Now getting id from the URL params

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to complete todo" });
  }
});

// Delete Todo Route
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  const { id } = req.params; // Extract the todo id from the request body

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
