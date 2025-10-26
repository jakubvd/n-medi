document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".unordered-list-content").forEach(list => {
    
    // 1. Remove empty list items (no text and only placeholder icons)
    list.querySelectorAll("li").forEach(li => {
      const text = li.textContent.trim();
      const hasPlaceholder = li.querySelector("img[src*='placeholder']");
      if (!text && hasPlaceholder) li.remove();
    });

    // 2. Count remaining list items
    const items = list.querySelectorAll("li").length;

    // 3. If there are no items left, hide the entire list
    if (items === 0) {
      list.style.display = "none";
      return;
    }

    // 4. Always use grid (to keep structure and alignment intact)
    list.style.display = "grid";
    list.style.gridTemplateColumns = "repeat(auto-fill, minmax(180px, 1fr))";
    list.style.columnGap = "var(--fluid-grid--f-g-gap-h)";
    list.style.rowGap = "var(--_gap-tokens---gap-vertical--g-v-44)";

    // 5. Force rows to auto-size even for 2–3 items
    list.style.gridAutoRows = "auto";
    list.style.alignItems = "start";
  });
});