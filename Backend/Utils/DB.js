const mongoose = require("mongoose");

async function connectDB(URI) {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1); 
  }
}

module.exports = connectDB;
