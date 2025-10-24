// Dynamically assigns unique IDs and ARIA relationships for each FAQ item to improve accessibility and navigation
document.addEventListener("DOMContentLoaded", () => {
  // Select all accordions inside CMS lists to process each FAQ item individually
  const accordions = document.querySelectorAll(".faq_accordion");

  accordions.forEach((accordion, index) => {
    const num = index + 1;
    const question = accordion.querySelector(".faq_question");
    const answer = accordion.querySelector(".faq_answer");

    if (!question || !answer) return; // Skip if either question or answer element is missing

    // Create unique IDs for question and answer to link them via ARIA attributes
    const qId = `faq-q-${num}`;
    const aId = `faq-a-${num}`;

    // Assign attributes (does not modify aria-hidden) to establish accessible relationships
    question.id = qId;
    question.setAttribute("aria-controls", aId);
    answer.id = aId;
    answer.setAttribute("aria-labelledby", qId);
  });
});