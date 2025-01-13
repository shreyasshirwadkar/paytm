const express = require("express");
const adminRouter = express.Router();

adminRouter.get("/login", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin login route is working",
  });
});

module.exports = adminRouter;
