
require("dotenv").config();
console.log("Loaded env:", process.env);
const mongoose = require("mongoose");
const fs = require("fs");

const uri = process.env.MONGODB_URI;

const bookSchema = new mongoose.Schema({}, { strict: false });
const Book = mongoose.model("Book", bookSchema, "books");

async function restoreData() {
  try {
    const rawData = fs.readFileSync("backup_books.json");
    const books = JSON.parse(rawData);
    
    await Book.insertMany(books);
    console.log("✅ Daten erfolgreich wiederhergestellt.");
  } catch (error) {
    console.error("❌ Fehler beim Wiederherstellen:", error);
  } finally {
    mongoose.disconnect();
  }
}

console.log("Connecting to MongoDB:", uri);
mongoose.connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB!");
    const rawData = fs.readFileSync("backup_books.json");
    const books = JSON.parse(rawData);
    return Book.insertMany(books);
  })
  .then(() => {
    console.log("✅ Daten erfolgreich wiederhergestellt.");
  })
  .catch((error) => {
    console.error("❌ Fehler beim Wiederherstellen:", error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
