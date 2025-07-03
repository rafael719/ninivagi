require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());


// F1F: Diese Anwendung ist für den Betrieb mit einem MongoDB Replica Set vorbereitet.
// Beispiel für eine Replica Set URI (siehe replica-setup/README-replica.md):
// MONGODB_URI=mongodb://localhost:27017,localhost:27018,localhost:27019/deinedb?replicaSet=rs0
const uri = process.env.MONGODB_URI;
console.log("Connecting to MongoDB:", uri);

const bookSchema = new mongoose.Schema({}, { strict: false });
const Book = mongoose.model("Book", bookSchema, "books");

mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// GET all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new book
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE all books
app.delete("/books", async (req, res) => {
  try {
    await Book.deleteMany({});
    res.json({ message: "All books deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
