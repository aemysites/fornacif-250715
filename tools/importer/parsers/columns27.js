/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row, matches example: Columns (columns27)
  const headerRow = ['Columns (columns27)'];

  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid layout (typically columns)
  const gridChildren = Array.from(grid.children);

  // For example HTML, left column is the content block, right is the image
  // Identify left column (non-img) and right column (img)
  let leftCol = null;
  let rightCol = null;
  for (const child of gridChildren) {
    if (child.tagName === 'IMG' && !rightCol) {
      rightCol = child;
    } else if (!leftCol) {
      leftCol = child;
    }
  }

  // In case content column is missing, fallback
  if (!leftCol && rightCol) leftCol = rightCol;
  if (!rightCol && leftCol) rightCol = leftCol;

  // For left column: keep all children (preserve structure)
  // Remove empty text nodes
  const leftCellContent = Array.from(leftCol.childNodes)
    .filter(node =>
      node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')
    );
  // If nothing found, fallback to leftCol itself
  const leftCell = leftCellContent.length ? leftCellContent : [leftCol];

  // For right column: just reference the image element if it exists
  let rightCell = '';
  if (rightCol && rightCol.tagName === 'IMG') {
    rightCell = rightCol;
  } else if (rightCol) {
    rightCell = rightCol;
  }

  // Build the table (2 columns, header row followed by one row of cells)
  const rows = [
    headerRow,
    [leftCell, rightCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
