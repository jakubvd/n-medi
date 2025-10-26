// Automatically remove empty list items from unordered lists
document.addEventListener("DOMContentLoaded", () => {
  // Find all lists with the class unordered-list-content
  document.querySelectorAll(".unordered-list-content").forEach(list => {
    list.querySelectorAll("li").forEach(li => {
      const text = li.textContent.trim();
      // if li doesn't contain any text (or an image with alt)
      if (!text && li.querySelectorAll("img[src*='placeholder']").length) {
        li.remove(); // remove entirely
      }
    });
  });
});
