// ========================================================
// DATA ATTRIBUTE CLEANER SCRIPT
// ========================================================
// This script loops through every element on the page
// and removes empty data attributes (e.g., data-foo="").
// It helps to clean up Webflow exports or HTML bloat,
// improving accessibility and DOM readability.
// ========================================================

document.querySelectorAll('*').forEach(el => {
  // Iterate through all attributes of the current element
  [...el.attributes].forEach(attr => {
    // Check if the attribute starts with "data-" and is empty
    if (attr.name.startsWith('data-') && attr.value === '') {
      // Remove empty data attribute
      el.removeAttribute(attr.name);
    }
  });
});