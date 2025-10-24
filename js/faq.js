// faq.js

// Wait for the DOM to be fully loaded before running setup
document.addEventListener('DOMContentLoaded', () => {
  // Assign unique IDs and ARIA relationships to each FAQ item
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    const button = item.querySelector('button');
    const content = item.querySelector('.faq-content');
    const uniqueId = `faq${index + 1}`;

    button.setAttribute('id', `${uniqueId}-button`);
    button.setAttribute('aria-controls', `${uniqueId}-content`);
    button.setAttribute('aria-expanded', 'false');

    content.setAttribute('id', `${uniqueId}-content`);
    content.setAttribute('aria-labelledby', `${uniqueId}-button`);
  });
});

// Handle click events on FAQ buttons to toggle ARIA expanded state
document.addEventListener('click', event => {
  if (event.target.matches('.faq-item button')) {
    const button = event.target;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
  }
});
