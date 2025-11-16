import { appendList } from "./utils.js";

const user = JSON.parse(localStorage.getItem("user"));

document.getElementById("user-name").textContent = user.username;

// Progress bar update
document.getElementById("progress-fill").style.width = user.progress + "%";

// Dynamic API base for Codespace compatibility
const API_BASE = `${window.location.protocol}//${window.location.hostname}:8000`;

// Load Recommendations
fetch(`${API_BASE}/api/recommend`, {
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
  .catch(err => {
    console.error("Error fetching recommendations:", err);
    document.getElementById("recommendations").innerHTML = "<li>Error loading recommendations. Please try again.</li>";
  });

// Load History
appendList("history", user.history.map(score => `Score: ${score}`));
