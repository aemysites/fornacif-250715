/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Each direct child of the grid is considered a column cell
  // In a more robust way, collect ALL direct children content as a cell
  const columns = [];
  for (const col of grid.children) {
    // Instead of just img, get all content in the col (image, text, buttons, etc)
    // If there's a single child, use it; if multiple, use an array
    const content = Array.from(col.childNodes).filter(node => {
      // Ignore empty text nodes
      return !(node.nodeType === 3 && !node.textContent.trim());
    });
    if (content.length === 1) {
      columns.push(content[0]);
    } else if (content.length > 1) {
      columns.push(content);
    } else {
      columns.push(''); // fallback for empty columns
    }
  }

  // Header row exactly as in the markdown example
  const headerRow = ['Columns (columns16)'];

  // Second row: one cell per column
  const tableRows = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  element.replaceWith(table);
}
