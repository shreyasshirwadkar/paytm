require("dotenv").config();
const mainRouter = require("./routes/index");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
