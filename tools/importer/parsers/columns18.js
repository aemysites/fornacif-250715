/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Identify the key blocks from the source HTML
  let textBlock = null;
  let imageBlock = null;
  let contactBlock = null;

  for (const child of children) {
    if (!textBlock && (child.querySelector('h2') || child.querySelector('h3') || child.querySelector('p'))) {
      textBlock = child;
    } else if (!imageBlock && child.tagName === 'IMG') {
      imageBlock = child;
    } else if (!contactBlock && child.tagName === 'UL') {
      contactBlock = child;
    }
  }

  // Fallbacks for robustness
  textBlock = textBlock || document.createElement('div');
  imageBlock = imageBlock || document.createElement('div');
  contactBlock = contactBlock || document.createElement('div');

  // Build rows according to the example:
  // Header: one column
  // Row 1: text block left, image right
  // Row 2: contact block left, right is empty
  const headerRow = ['Columns (columns18)'];
  const firstContentRow = [textBlock, imageBlock];
  const secondContentRow = [contactBlock, ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    firstContentRow,
    secondContentRow
  ], document);

  element.replaceWith(table);
}
