/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid container with columns
  const grid = element.querySelector('.grid-layout');
  const columns = grid ? Array.from(grid.children) : Array.from(element.children);

  // Each cell in the content row is the content of the corresponding column wrapper
  const contentRow = columns.map((col) => {
    // If the wrapper has only one child (commonly a <p> or <a>), use that
    if (col.children.length === 1) {
      return col.children[0];
    }
    // Otherwise, use the column itself
    return col;
  });

  // The header row should be a single cell array
  const headerRow = ['Columns (columns31)'];

  // Compose the table as per the requirements
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
