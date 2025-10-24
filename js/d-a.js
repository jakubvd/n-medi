/**
 * d-a.js — Dynamic Attribute-Based Layout Adjustments (prod-safe version)
 * -----------------------------------------------------------------------------
 * Purpose:
 *   Applies inline CSS styles dynamically based on custom data attributes
 *   defined in Webflow elements. This allows fine-grained control over
 *   padding, dimensions, and spacing directly in the Designer.
 *
 * Why "data-prod-*":
 *   The "prod" prefix prevents Webflow Designer from displaying placeholder
 *   labels (e.g., “max-width:”) when a data attribute is left empty.
 *   These placeholders are automatically rendered by Webflow in edit mode
 *   for visibility, which can break layout visuals. Prefixing them avoids this.
 *
 * Usage examples:
 *   <div data-prod-padding-left="2rem" data-prod-padding-right="1.5rem"></div>
 *   <div data-prod-padding-horizontal="3rem"></div>
 *   <div data-prod-width="200px" data-prod-max-width="80ch"></div>
 *
 * Supported attributes:
 *   - data-prod-padding-left
 *   - data-prod-padding-right
 *   - data-prod-padding-top
 *   - data-prod-padding-bottom
 *   - data-prod-padding-horizontal (sets both left & right)
 *   - data-prod-padding-vertical (sets both top & bottom)
 *   - data-prod-width
 *   - data-prod-min-width
 *   - data-prod-max-width
 *   - data-prod-height
 *   - data-prod-min-height
 *   - data-prod-max-height
 *
 * -----------------------------------------------------------------------------
 * Author: Jakub Michalak
 * License: MIT
 */

(function () {
  /** Detect if attribute value is empty or placeholder */
  function isEmpty(val) {
    if (!val) return true;
    const v = String(val).trim();
    return (
      !v ||
      v === '{{}}' ||
      v.startsWith('{{ ') ||
      v.endsWith(' }}') ||
      v.toLowerCase() === 'none'
    );
  }

  /** Apply inline style if attribute has a valid value */
  function applyIfExists(attr, cssProp) {
    document.querySelectorAll(`[${attr}]`).forEach(el => {
      const val = el.getAttribute(attr);
      if (!isEmpty(val)) {
        el.style[cssProp] = val.trim();
      }
    });
  }

  /** Initialize all supported attributes */
  function init() {
    // Individual paddings
    applyIfExists('data-prod-padding-left', 'paddingLeft');
    applyIfExists('data-prod-padding-right', 'paddingRight');
    applyIfExists('data-prod-padding-top', 'paddingTop');
    applyIfExists('data-prod-padding-bottom', 'paddingBottom');

    // Horizontal and vertical shorthand
    document.querySelectorAll('[data-prod-padding-horizontal]').forEach(el => {
      const v = el.getAttribute('data-prod-padding-horizontal');
      if (!isEmpty(v)) {
        el.style.paddingLeft = v.trim();
        el.style.paddingRight = v.trim();
      }
    });
    document.querySelectorAll('[data-prod-padding-vertical]').forEach(el => {
      const v = el.getAttribute('data-prod-padding-vertical');
      if (!isEmpty(v)) {
        el.style.paddingTop = v.trim();
        el.style.paddingBottom = v.trim();
      }
    });

    // Width & height
    applyIfExists('data-prod-width', 'width');
    applyIfExists('data-prod-min-width', 'minWidth');
    applyIfExists('data-prod-max-width', 'maxWidth');
    applyIfExists('data-prod-height', 'height');
    applyIfExists('data-prod-min-height', 'minHeight');
    applyIfExists('data-prod-max-height', 'maxHeight');
  }

  /** Run when DOM is ready */
  document.addEventListener('DOMContentLoaded', init);
})();