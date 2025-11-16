import { save } from "./utils.js";

let timeLeft = 30;
const timer = setInterval(() => {
  document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
  if (timeLeft-- <= 0) {
    clearInterval(timer);
    document.getElementById("quiz-form").submit();
  }
}, 1000);

// Dynamic API base for Codespace compatibility
const API_BASE = `${window.location.protocol}//${window.location.hostname}:8000`;

document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const answers = [
    { question: "q1", answer: "4", user_answer: this.q1.value },
    { question: "q2", answer: "Paris", user_answer: this.q2.value }
  ];

  fetch(`${API_BASE}/api/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: answers })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").textContent =
        `Score: ${data.score}/${data.total} - ${data.performance}`;

      // Update user progress
      const user = JSON.parse(localStorage.getItem("user"));
      user.history.push(data.score);
      user.progress = Math.min(100, user.progress + 20);
      localStorage.setItem("user", JSON.stringify(user));
    })
    .catch(err => {
      console.error("Error submitting quiz:", err);
      document.getElementById("result").textContent = "Error submitting quiz. Please try again.";
    });
});
