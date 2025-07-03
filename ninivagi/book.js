require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
console.log("Connecting to MongoDB:", uri);

const bookSchema = new mongoose.Schema({}, { strict: false });
const Book = mongoose.model("Book", bookSchema, "books");

const exampleBooks = [
  { title: "Quantum Echoes", author: "Lena Strauss", year: 2090 },
  { title: "Whispers of the Forest", author: "Armin Keller", year: 1984 },
  { title: "Crimson Horizon", author: "Naomi Ishikawa", year: 2022 }
];

mongoose.connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB!");
    return Book.insertMany(exampleBooks);
  })
  .then(() => {
    console.log("Bücher erfolgreich eingefügt.");
  })
  .catch((error) => {
    console.error("Fehler beim Einfügen oder Verbinden:", error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
