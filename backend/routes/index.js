const express = require("express");
const userRouter = express.Router();
const adminRouter = express.Router();

userRouter.get("/login", (req, res) => {});

adminRouter.get("/login", (req, res) => {});

module.exports = {
  userRouter,
  adminRouter,
};
