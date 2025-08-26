/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the columns
  let grid = element.querySelector('.w-layout-grid');
  let columnElements = [];
  if (grid) {
    // Get all immediate children of the grid (each column)
    columnElements = Array.from(grid.children);
  } else {
    // Fallback: use immediate children if grid not found
    columnElements = Array.from(element.children);
  }

  // Block header must exactly match: 'Columns (columns3)'
  const headerRow = ['Columns (columns3)'];

  // The row should contain as many cells as columns found
  // Each cell is the referenced original column element from the DOM
  const contentRow = columnElements;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
