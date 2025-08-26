/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;
  // Build the table
  const cells = [];
  // Header row: Exactly one cell, per the example
  cells.push(['Columns (columns29)']);
  // Second row: as many cells as there are columns
  cells.push(columns);
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
