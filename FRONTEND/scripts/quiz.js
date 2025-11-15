
import { save } from "./utils.js";

let timeLeft = 30;
const timer = setInterval(() => {
  document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
  if (timeLeft-- <= 0) {
    clearInterval(timer);
    document.getElementById("quiz-form").submit();
  }
}, 1000);

document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const answers = [
    { question: "q1", answer: "4", user_answer: this.q1.value },
    { question: "q2", answer: "Paris", user_answer: this.q2.value }
  ];

  fetch("http://127.0.0.1:8000/api/quiz", {
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
      save("user", user);
    })
    .catch(err => console.error("Error submitting quiz:", err));
});
