const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: Number,
  password: String,
});

module.exports = User = mongoose.model("user", userSchema);
