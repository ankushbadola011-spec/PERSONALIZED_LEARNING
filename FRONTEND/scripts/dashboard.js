
import { appendList } from "./utils.js";

const user = JSON.parse(localStorage.getItem("user"));

document.getElementById("user-name").textContent = user.username;

// Progress bar update
document.getElementById("progress-fill").style.width = user.progress + "%";

// Load Recommendations
fetch("http://127.0.0.1:8000/api/recommend", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: user.username, level: user.level })
})
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("recommendations");
    data.recommended.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  })
  .catch(err => console.error("Error fetching recommendations:", err));

// Load History
appendList("history", user.history.map(score => `Score: ${score}`));
