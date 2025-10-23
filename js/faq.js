// Handles ARIA state toggling for FAQ accordion buttons
document.addEventListener('click', (e) => {
  // Detect click on .faq_question buttons only
  const button = e.target.closest('.faq_question');
  if (!button) return;

  // Check current expansion state of the clicked button
  const expanded = button.getAttribute('aria-expanded') === 'true';

  // Get corresponding answer panel based on aria-controls reference
  const answer = document.getElementById(button.getAttribute('aria-controls'));

  // Toggle ARIA attributes to keep screen readers in sync
  // aria-expanded="true" → section is open; "false" → section is closed
  button.setAttribute('aria-expanded', !expanded);

  // aria-hidden="true" hides the answer for assistive tech; "false" reveals it
  answer.setAttribute('aria-hidden', expanded);
});