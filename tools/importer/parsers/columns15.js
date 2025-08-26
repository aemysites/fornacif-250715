/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container for columns
  let grid = element.querySelector('.w-layout-grid');
  if (!grid) {
    const container = element.querySelector('.container');
    if (container) {
      grid = container.querySelector('.w-layout-grid') || container;
    } else {
      grid = element;
    }
  }

  // Get the immediate children of the grid as columns
  const columns = Array.from(grid.children).filter(el => el.nodeType === 1);
  // If columns is empty, fallback to the grid itself
  const bodyRow = columns.length > 0 ? columns : [grid];

  // The header row must be exactly one cell with the specified text
  const headerRow = ['Columns (columns15)'];

  // Table rows: header (single cell), then content row (one cell per column)
  const cells = [headerRow, bodyRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
