// Interfaces untuk Type Safety (mudah dipahami)
interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

// Constants
const API_BASE = "http://localhost:3000/api"; // Ganti ke domain deploy nanti
const form = document.getElementById("reviewForm") as HTMLFormElement;
const loading = document.getElementById("loading") as HTMLDivElement;
const message = document.getElementById("message") as HTMLDivElement;
const container = document.getElementById("reviewsContainer") as HTMLDivElement;

// Helper: Show message
const showMessage = (text: string, type: "success" | "error") => {
  message.textContent = text;
  message.className = type;
  setTimeout(() => {
    message.textContent = "";
    message.className = "";
  }, 5000);
};

// Helper: Render stars
const renderStars = (rating: number): string => "⭐".repeat(rating);

// Fetch & Render Reviews
const fetchReviews = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE}/reviews`);
    if (!response.ok) throw new Error("Failed to fetch");
    const reviews: Review[] = await response.json();

    if (reviews.length === 0) {
      container.innerHTML =
        '<p class="empty-state">Belum ada testimoni. Jadilah yang pertama!</p>';
      return;
    }

    container.innerHTML = reviews
      .map(
        (review) => `
      <div class="review-card">
        <h3>${review.name}</h3>
        <div class="stars">${renderStars(review.rating)}</div>
        <p class="date">Tanggal: ${review.date}</p>
        <p>${review.comment}</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error(error);
    container.innerHTML =
      '<p class="empty-state">Gagal memuat review. Coba refresh halaman.</p>';
  }
};

// Submit Form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loading.classList.remove("hidden");

  const formData = new FormData(form);
  const data: Partial<Review> = {
    name: (formData.get("name") as string).trim(),
    rating: parseInt(formData.get("rating") as string),
    comment: (formData.get("comment") as string).trim(),
  };

  try {
    const response = await fetch(`${API_BASE}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to submit");
    }

    showMessage("Review berhasil dikirim! Terima kasih.", "success");
    form.reset();
    fetchReviews(); // Refresh list
  } catch (error) {
    showMessage((error as Error).message, "error");
  } finally {
    loading.classList.add("hidden");
  }
});

// Init: Load reviews on page load
document.addEventListener("DOMContentLoaded", fetchReviews);
