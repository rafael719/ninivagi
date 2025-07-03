
require("dotenv").config();
console.log("Loaded env:", process.env);
const mongoose = require("mongoose");
const fs = require("fs");

const uri = process.env.MONGODB_URI;

const bookSchema = new mongoose.Schema({}, { strict: false });
const Book = mongoose.model("Book", bookSchema, "books");

async function backupData() {
  try {
    const books = await Book.find({});
    fs.writeFileSync("backup_books.json", JSON.stringify(books, null, 2));
    console.log("✅ Backup erfolgreich erstellt.");
  } catch (error) {
    console.error("❌ Fehler beim Backup:", error);
  } finally {
    mongoose.disconnect();
  }
}

console.log("Connecting to MongoDB:", uri);
mongoose.connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB!");
    return Book.find({});
  })
  .then((books) => {
    fs.writeFileSync("backup_books.json", JSON.stringify(books, null, 2));
    console.log("✅ Backup erfolgreich erstellt.");
  })
  .catch((error) => {
    console.error("❌ Fehler beim Backup:", error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
