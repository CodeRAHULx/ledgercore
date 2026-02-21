// require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("databse is connected");
  } catch (err) {
    console.log("error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
