const express = require("express");
const userRouter = require("./user");
const adminRouter = require("./admin");
const accountsRouter = require("./accounts");
const mainRouter = express.Router();

mainRouter.use("/user", userRouter);

mainRouter.use("/admin", adminRouter);

mainRouter.use("/accounts", accountsRouter);

module.exports = mainRouter;
