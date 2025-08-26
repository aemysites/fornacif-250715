/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive check for grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get the columns: usually image and text
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: the image block (reference directly)
  const imageCol = columns[0];

  // Second column: text block, including heading, paragraph, and buttons
  const textCol = columns[1];

  // TABLE STRUCTURE: Header row, then content row with both columns
  const tableRows = [
    ['Columns (columns1)'],
    [imageCol, textCol]
  ];
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}
