/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs - each represents a column
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // The structure must be: header row (1 col), data row (N cols)
  const headerRow = ['Columns (columns4)'];
  const columnsRow = columnDivs; // Each div contains the column content (image in this case)
  // Create the table structure: header row, columns row
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
