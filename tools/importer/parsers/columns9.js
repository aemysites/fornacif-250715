/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container for columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get each immediate column (not nested)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header row: EXACTLY one column, block name only
  const headerRow = ['Columns (columns9)'];

  // Content row: as many columns (cells) as needed for the layout
  const contentRow = columns;

  // Table: header is single-cell, content row has N cells
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
