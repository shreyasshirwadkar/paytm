const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User } = require("../db");
const userRouter = express.Router();
const { z } = require("zod");
const bcrypt = require("bcryptjs");

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

module.exports = userRouter;
