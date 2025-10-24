/**
 * d-a.js — Dynamic Attribute-Based Layout Adjustments
 * -----------------------------------------------------------------------------
 * Purpose:
 *   Allows applying custom layout and spacing values via data attributes.
 *   Useful for edge cases where designers specify one-off paddings, widths,
 *   or constraints directly in Webflow components.
 *
 * Usage examples:
 *   <div data-padding-left="2rem" data-padding-right="1.5rem"></div>
 *   <div data-padding-horizontal="3rem"></div>
 *   <div data-width="200px" data-max-width="80ch"></div>
 *
 * Supported attributes:
 *   - data-padding-left
 *   - data-padding-right
 *   - data-padding-top
 *   - data-padding-bottom
 *   - data-padding-horizontal (sets both left & right)
 *   - data-padding-vertical (sets both top & bottom)
 *   - data-width
 *   - data-min-width
 *   - data-max-width
 *   - data-height
 *   - data-min-height
 *   - data-max-height
 *
 * -----------------------------------------------------------------------------
 * Author: Jakub Michalak
 * License: MIT
 */

(function () {
  /** Utility to safely apply inline styles from data attributes */
  function applyStyleFromAttr(selector, cssProp, attrName, transformFn = v => v) {
    document.querySelectorAll(`[${attrName}]`).forEach(el => {
      const value = el.getAttribute(attrName);
      if (value && value.trim() !== '') el.style[cssProp] = transformFn(value);
    });
  }

  /** Initialize the layout adjustments */
  function initDataLayout() {
    // Padding - individual sides
    applyStyleFromAttr('[data-padding-left]', 'paddingLeft', 'data-padding-left');
    applyStyleFromAttr('[data-padding-right]', 'paddingRight', 'data-padding-right');
    applyStyleFromAttr('[data-padding-top]', 'paddingTop', 'data-padding-top');
    applyStyleFromAttr('[data-padding-bottom]', 'paddingBottom', 'data-padding-bottom');

    // Padding - grouped
    document.querySelectorAll('[data-padding-horizontal]').forEach(el => {
      const value = el.getAttribute('data-padding-horizontal');
      if (value && value.trim() !== '') {
        el.style.paddingLeft = value;
        el.style.paddingRight = value;
      }
    });
    document.querySelectorAll('[data-padding-vertical]').forEach(el => {
      const value = el.getAttribute('data-padding-vertical');
      if (value && value.trim() !== '') {
        el.style.paddingTop = value;
        el.style.paddingBottom = value;
      }
    });

    // Dimensions
    applyStyleFromAttr('[data-width]', 'width', 'data-width');
    applyStyleFromAttr('[data-min-width]', 'minWidth', 'data-min-width');
    applyStyleFromAttr('[data-max-width]', 'maxWidth', 'data-max-width');
    applyStyleFromAttr('[data-height]', 'height', 'data-height');
    applyStyleFromAttr('[data-min-height]', 'minHeight', 'data-min-height');
    applyStyleFromAttr('[data-max-height]', 'maxHeight', 'data-max-height');
  }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', initDataLayout);
})();