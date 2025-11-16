// utils.js

// Save data to localStorage
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Load data from localStorage
export function load(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Show error message
export function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.color = "red";
}

// Smooth scroll
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Create list items dynamically
export function appendList(parentId, items) {
  const ul = document.getElementById(parentId);
  ul.innerHTML = ""; // Clear old items

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.classList.add("list-item");
    ul.appendChild(li);
  });
}
