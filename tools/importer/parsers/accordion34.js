/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match exactly
  const headerRow = ['Accordion (accordion34)'];

  // Find all accordion items (immediate children)
  const items = element.querySelectorAll(':scope > .accordion');
  const rows = [];
  items.forEach((item) => {
    // Title: .w-dropdown-toggle .paragraph-lg (or fallback)
    let titleEl;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg');
      if (!titleEl) {
        // fallback to the first div inside toggle
        titleEl = toggle.querySelector('div');
      }
    }
    if (!titleEl) {
      // fallback to empty node to avoid errors
      titleEl = document.createTextNode('');
    }

    // Content: nav.accordion-content .rich-text (or fallback)
    let contentEl;
    const contentNav = item.querySelector('nav.accordion-content');
    if (contentNav) {
      contentEl = contentNav.querySelector('.rich-text, .w-richtext');
      if (!contentEl) {
        // fallback to the first contentful div inside nav
        contentEl = contentNav.querySelector('div');
        if (!contentEl) {
          contentEl = contentNav;
        }
      }
    }
    if (!contentEl) {
      // fallback to empty node to avoid errors
      contentEl = document.createTextNode('');
    }

    // Structure: [title cell, content cell]
    rows.push([titleEl, contentEl]);
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
