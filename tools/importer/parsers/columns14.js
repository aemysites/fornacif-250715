/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout, which contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid - should be [h2, content div]
  const gridChildren = Array.from(grid.children);

  // Header row for block table
  const headerRow = ['Columns (columns14)'];

  // Second row: two columns, referencing the actual existing elements
  // Defensive: if some elements are missing, place empty string
  const firstCol = gridChildren[0] || '';
  const secondCol = gridChildren[1] || '';

  // Only add as many columns as we have, but must be at least 2 for this layout
  const row = [firstCol, secondCol];

  const cells = [headerRow, row];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
