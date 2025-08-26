/* global WebImporter */
export default function parse(element, { document }) {
  // Compose rows for the table
  const rows = [];
  // Table header: block name as in example
  rows.push(['Cards (cards23)']);

  // All .w-tab-pane under root element
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach(tabPane => {
    // Find the first .w-layout-grid under this tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll('a');
    cards.forEach(card => {
      // Image: either an <img> (first found in the card), or empty string if none
      const img = card.querySelector('img');
      const imageCell = img || '';

      // Heading (h3 or similar)
      const heading = card.querySelector('h3, .h4-heading');
      // Description: first .paragraph-sm
      const desc = card.querySelector('.paragraph-sm');

      // Build text cell contents, preserving order and references
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc && desc !== heading) textCell.push(desc);

      // Only add valid rows (must have at least some content)
      if (imageCell || textCell.length) {
        rows.push([imageCell, textCell]);
      }
    });
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
