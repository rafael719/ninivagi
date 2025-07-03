require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
console.log("Connecting to MongoDB:", uri);

mongoose.connect(uri).then(() => {
  console.log("✅ Connected to MongoDB!");
  mongoose.disconnect();
}).catch((err) => {
  console.error("❌ Connection error:", err);
});
