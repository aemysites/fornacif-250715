/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row as in the markdown example
  const headerRow = ['Carousel (carousel36)'];

  // Get the grid that holds the two columns: left (text) and right (images)
  const grid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!grid) return;

  // The left column is the first child; right column is the second
  const leftCol = grid.children[0];
  const rightCol = grid.children[1];
  if (!rightCol) return; // Must have images to form slides

  // Get all images for the carousel (should be all direct children of the inner grid)
  const imagesGrid = rightCol.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  if (!imagesGrid) return;
  const images = Array.from(imagesGrid.querySelectorAll('img'));

  // Prepare the text content for the first slide (using existing elements)
  // Use the leftCol's h1, p, and button group in order, if present
  const slideTextContent = [];
  const h1 = leftCol.querySelector('h1');
  if (h1) slideTextContent.push(h1);
  const p = leftCol.querySelector('p');
  if (p) slideTextContent.push(p);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) slideTextContent.push(buttonGroup);

  // Build rows: first row has text, others are images only
  const rows = images.map((img, idx) => {
    if (idx === 0 && slideTextContent.length > 0) {
      return [img, slideTextContent];
    } else {
      return [img, ''];
    }
  });

  // Compose the table following the markdown example: header row, then slide rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
