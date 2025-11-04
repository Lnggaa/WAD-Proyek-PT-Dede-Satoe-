const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "reviews.json");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const readReviews = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeReviews = (reviews) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2));
};

app.get("/api/reviews", (req, res) => {
  const reviews = readReviews();
  res.json(reviews);
});

app.post("/api/reviews", (req, res) => {
  const { name, rating, comment } = req.body;
  if (
    !name ||
    !rating ||
    rating < 1 ||
    rating > 5 ||
    !comment ||
    comment.length < 10
  ) {
    return res.status(400).json({
      error: "Invalid input: Name required, rating 1-5, comment min 10 chars",
    });
  }
  const reviews = readReviews();
  const newReview = {
    id: Date.now(),
    name,
    rating: parseInt(rating),
    comment,
    date: new Date().toISOString().split("T")[0],
  };
  reviews.push(newReview);
  writeReviews(reviews);
  res.status(201).json(newReview);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// script.js
const form = document.getElementById("reviewForm");
const testimonialsContainer = document.querySelector(".testimonials");
const emptyState = testimonialsContainer.querySelector(".empty-state");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const rating = document.getElementById("rating").value;
  const review = document.getElementById("review").value.trim();

  // Hapus pesan kosong
  if (emptyState) emptyState.remove();

  // Buat bintang
  const stars = "⭐".repeat(rating);

  // Buat item testimoni
  const item = document.createElement("div");
  item.className = "testimonial-item";
  item.innerHTML = `
    <strong>${name}</strong><span class="stars">${stars}</span>
    <p>"${review}"</p>
  `;

  // Tambahkan ke daftar
  testimonialsContainer.appendChild(item);

  // Reset form
  form.reset();
});
