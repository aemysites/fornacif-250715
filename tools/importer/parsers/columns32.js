/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  let colEls = [];
  if (grid) {
    // The grid children are the columns (img and content div)
    colEls = Array.from(grid.children);
  }

  // Defensive: if grid or columns not found, fallback to direct children of section
  if (colEls.length === 0) {
    colEls = Array.from(element.children);
  }

  // Only support 2 columns for this layout (image, content)
  const cells = [];
  // Header row as required
  cells.push(['Columns (columns32)']);

  // Compose the second row with each column's content
  if (colEls.length >= 2) {
    cells.push([colEls[0], colEls[1]]);
  } else if (colEls.length === 1) {
    // Fallback: single column
    cells.push([colEls[0]]);
  } else {
    // If no columns found, leave content empty
    cells.push(['']);
  }

  // Create and replace with the new block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
