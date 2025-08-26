/* global WebImporter */
export default function parse(element, { document }) {
  // Look for the grid containing columns in the structure: section > container > grid-layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of grid, which are the columns
  const columns = Array.from(grid.children);
  // If there are no columns, do nothing
  if (columns.length === 0) return;

  // Construct the header row exactly as specified
  const headerRow = ['Columns (columns30)'];

  // The second row contains each column as a separate cell
  // Reference the existing elements, do not clone or alter
  const columnsRow = columns.map(col => col);

  // Build the cells array
  const cells = [headerRow, columnsRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
