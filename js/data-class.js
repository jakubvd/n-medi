// Automatically add classes from data-class attribute
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-class]").forEach(el => {
    const classes = el.getAttribute("data-class").split(" ").filter(Boolean);
    el.classList.add(...classes);
  });
});