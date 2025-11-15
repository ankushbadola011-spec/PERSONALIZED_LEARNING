function login() {
  const username = document.getElementById("username").value;
  const level = document.getElementById("level").value;
  localStorage.setItem("user", JSON.stringify({ username, level }));
  window.location.href = "dashboard.html";
}

if (window.location.pathname.includes("dashboard.html")) {
  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById("user-name").textContent = user.username;

  fetch("http://127.0.0.1:5000/api/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("recommendations");
    data.recommended.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  });
}

if (window.location.pathname.includes("quiz.html")) {
  document.getElementById("quiz-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const answers = [
      { question: "q1", answer: "4", user_answer: this.q1.value },
      { question: "q2", answer: "Paris", user_answer: this.q2.value }
    ];
    fetch("http://127.0.0.1:5000/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers)
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").textContent =
        `Score: ${data.score}/${data.total}`;
    });
  });
}