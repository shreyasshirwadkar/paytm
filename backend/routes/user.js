const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User } = require("../db");
const userRouter = express.Router();
const { z } = require("zod");
const bcrypt = require("bcryptjs");
const { authMiddleware } = require("../middleware"); // Import middleware

const signupSchema = z.object({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

userRouter.post("/signup", async (req, res) => {
  const input = req.body;
  const { success } = signupSchema.safeParse(input);
  if (!success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }
  const user = User.findOne({ username: input.username });
  if (user._id) {
    return res.json({
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(input.password, 10);
  const dbUser = await User.create({
    ...input,
    password: hashedPassword, // Store hashed password
  });
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );

  res.json({
    message: "User Created Successfully!",
    token: token,
  });
});

userRouter.post("/signin", async (req, res) => {
  const input = req.body;
  //{username,password}
  const { success } = signinSchema.safeParse(input);
  if (!success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({ username: input.username });
  if (!existingUser) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }
  const isPasswordCorrect = await bcrypt.compare(
    input.password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign(
    {
      userId: existingUser._id,
    },
    JWT_SECRET
  );

  res.json({
    token: token,
  });
});

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne(
    { _id: req.userId }, // Find the document by userId from the token
    { $set: req.body } // Update fields from the request body
  );
  res.json({
    message: "Updated successfully",
  });
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter;
  console.log(filter);
  if (!filter) {
    return res.status(400).json({
      message: "Please provide a name to filter by.",
    });
  }
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });
  if (users.length === 0) {
    return res.status(404).json({
      message: "No users found matching the given filter",
    });
  }
  console.log(users);
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = userRouter;
