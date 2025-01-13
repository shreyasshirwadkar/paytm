require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);
console.log("Connected to DB");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxLength: 50,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
