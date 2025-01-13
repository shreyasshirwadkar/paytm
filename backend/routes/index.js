const express = require("express");
const userRouter = require("./user");
const adminRouter = require("./admin");
const mainRouter = express.Router();

mainRouter.use("/user", userRouter);

mainRouter.use("/admin", adminRouter);

module.exports = mainRouter;
