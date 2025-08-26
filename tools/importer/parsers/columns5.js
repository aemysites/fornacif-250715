/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing two columns (one with content, one with the image)
  const outerGrid = element.querySelector('.grid-layout.grid-gap-xxl');
  if (!outerGrid) return;

  // Get immediate children of the main grid
  const gridChildren = Array.from(outerGrid.children);
  // We'll need to identify the content column and the image column
  let contentCol = null;
  let imageCol = null;

  gridChildren.forEach((child) => {
    if (child.tagName === 'IMG') {
      imageCol = child;
    } else if (child.querySelector('h2, .rich-text, .button-group')) {
      // This is the content column
      contentCol = child;
    }
  });

  if (!contentCol || !imageCol) return;

  // Find the main content section inside the content column
  // This allows for variations in grid nesting
  let mainContent = contentCol.querySelector('.section');
  if (!mainContent) mainContent = contentCol;

  // Construct the table as per example: header row, then the two columns
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns5)'],
    [mainContent, imageCol]
  ], document);

  element.replaceWith(table);
}
