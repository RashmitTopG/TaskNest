const zod = require("zod");

const validateMiddleware = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation Error",
        errors: result.error.errors,
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
  firstName: zod.string().max(30),
  lastName: zod.string().max(30),
  username: zod.string().email(),
  password: zod.string().min(8).max(20),
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8).max(20),
});

const todoSchema = zod.object({
  title: zod.string().min(1, "Title is required").max(30),
  description: zod.string().optional(),
  completed: zod.boolean(),
});

module.exports = {
  userSchema,
  todoSchema,
  signinSchema,
  validateMiddleware,
};
