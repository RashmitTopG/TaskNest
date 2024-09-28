const zod = require("zod");
const { default: errorMap } = require("zod/locales/en.js");

const validateMiddleware = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation Error",
        errors: result.error.errors.map((err) => ({
          path: err.path.join("."), // Path of the field with the error
          message: err.message, // Error message
        })),
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const userSchema = zod.object({
  firstName: zod.string().min(1).max(30), // Should not be empty
  lastName: zod.string().min(1).max(30), // Should not be empty
  username: zod.string().email().min(1), // Should not be empty and must be a valid email
  password: zod.string().min(8).max(20), // Length constraints
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8).max(20),
});

const todoSchema = zod.object({
  title: zod.string().min(1, "Title is required").max(30),
  description: zod.string().optional(),
  completed: zod.boolean().optional(),
});

module.exports = {
  userSchema,
  todoSchema,
  signinSchema,
  validateMiddleware,
};
