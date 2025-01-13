require("dotenv").config();
const mainRouter = require("./routes/index");
const express = require("express");
const app = express();

app.use("/api/v1", mainRouter);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
