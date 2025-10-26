// Automaticlly insert <br> tags in headings based on CMS content line breaks
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-heading-br]").forEach(el => {
    const shouldBreak = el.getAttribute("data-heading-br") === "true";
    if (!shouldBreak) return;

    // Fetch the text content
    const text = el.textContent.trim();

    // Replace line breaks with <br>
    const html = text.replace(/\r?\n|\r/g, "<br>");

    el.innerHTML = html;
  });
});