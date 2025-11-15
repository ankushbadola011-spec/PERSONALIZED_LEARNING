document.getElementById("login-btn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const level = document.getElementById("level").value;

  if (!username || level === "Select Your Level") {
    document.getElementById("error-msg").textContent = "Please enter all details!";
    return;
  }

  document.getElementById("loader").classList.remove("hidden");

  const user = { username, level, progress: 0, history: [] };
  localStorage.setItem("user", JSON.stringify(user));

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1000);
});
