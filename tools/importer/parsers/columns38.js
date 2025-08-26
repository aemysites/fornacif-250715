/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell (one item array)
  const headerRow = ['Columns (columns38)'];

  // Get all direct child divs (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The content row is an array with one cell per column (div)
  const contentRow = columns;

  // Build the table with a single-cell header row and a multi-cell content row
  const tableCells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
