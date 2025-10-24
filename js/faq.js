/**
 * Initializes and manages FAQ accordion accessibility.
 * 1. Dynamically assigns unique IDs and ARIA relationships.
 * 2. Handles toggling of ARIA states (aria-expanded, aria-hidden) on click.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- STEP 1: Assign ARIA relationships dynamically ---
  const accordions = document.querySelectorAll(".faq_accordion");

  accordions.forEach((accordion, index) => {
    const num = index + 1;
    const question = accordion.querySelector(".faq_question");
    const answer = accordion.querySelector(".faq_answer");

    if (!question || !answer) return; // Skip incomplete items

    // Generate unique IDs for question and answer
    const qId = `faq-q-${num}`;
    const aId = `faq-a-${num}`;

    // Assign ARIA attributes for accessibility linkage
    question.id = qId;
    question.setAttribute("aria-controls", aId);
    question.setAttribute("aria-expanded", "false"); // default closed
    answer.id = aId;
    answer.setAttribute("aria-labelledby", qId);
    answer.setAttribute("aria-hidden", "true"); // default hidden
  });

  // --- STEP 2: Manage ARIA toggle behavior on click ---
  document.addEventListener("click", (e) => {
    // Detect clicks on .faq_question buttons only
    const button = e.target.closest(".faq_question");
    if (!button) return;

    // Get current state
    const expanded = button.getAttribute("aria-expanded") === "true";

    // Find the corresponding answer panel
    const answer = document.getElementById(button.getAttribute("aria-controls"));
    if (!answer) return;

    // Toggle ARIA attributes to reflect the new state
    button.setAttribute("aria-expanded", String(!expanded));
    answer.setAttribute("aria-hidden", String(expanded));
  });
});