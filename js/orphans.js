/**
 * orphans.js — Typographic Fixer
 * -----------------------------------------------------------------------------
 * Purpose:
 *   Prevents typographical orphans and improves line-end readability by joining
 *   single-letter words and/or the last N words in text elements.
 *
 * Usage:
 *   <div data-text-fix="orph">Z i o u w z example text</div>
 *   <div data-text-fix="last-2">To jest długi tekst z ostatnimi słowami</div>
 *   <div data-text-fix="both">Łączy obie funkcje</div>
 *
 * Supported values:
 *   - orph    → replaces spaces after single-letter words with &nbsp;
 *   - last-2  → joins last 2 words with &nbsp;
 *   - both    → applies both effects together
 *
 * -----------------------------------------------------------------------------
 * Author: Jakub Michalak
 * License: MIT
 */

(function () {
  const ORPHAN_REGEX = /(^|\s)([aiouwzAIUOWZ])\s+(?=\S)/g;
  const SKIP = new Set(["SCRIPT", "STYLE", "CODE", "PRE"]);

  /** Replace single-letter words (orphans) */
  function fixOrphans(text) {
    return text.replace(ORPHAN_REGEX, (_, p1, p2) => `${p1}${p2}\u00A0`);
  }

  /** Join the last N words using NBSP (default: 2) */
  function joinLastWords(text, count = 2) {
    let result = text;
    for (let i = 0; i < count; i++) {
      result = result.replace(/(\S)\s+(\S+)\s*$/u, (_, a, b) => `${a}\u00A0${b}`);
    }
    return result;
  }

  /** Process a single element */
  function processElement(el) {
    if (SKIP.has(el.nodeName)) return;
    const mode = el.getAttribute("data-text-fix");
    if (!mode) return;

    let text = el.textContent;
    if (!text) return;

    switch (mode) {
      case "orph":
        text = fixOrphans(text);
        break;
      case "last-2":
        text = joinLastWords(text, 2);
        break;
      case "both":
        text = joinLastWords(fixOrphans(text), 2);
        break;
      default:
        return;
    }

    el.textContent = text;
  }

  /** Apply processing to all [data-text-fix] elements */
  function applyTextFix(root = document) {
    root.querySelectorAll("[data-text-fix]").forEach(processElement);
  }

  /** Observe dynamic content changes */
  function observeMutations() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.hasAttribute("data-text-fix")) processElement(node);
            node.querySelectorAll?.("[data-text-fix]").forEach(processElement);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyTextFix();
    observeMutations();
  });
})();