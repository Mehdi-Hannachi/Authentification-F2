const mongoose = require("mongoose");

require("dotenv").config({ path: "./config/.env" });

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Data base connected successfully");
  } catch (error) {
    console.log("Data base error", error);
  }
};

module.exports = connectDB;
