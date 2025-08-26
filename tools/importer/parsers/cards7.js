/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards7)'];

  // Each card is a direct child div of the grid
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card, get the image (the only child of each aspect div)
  const rows = Array.from(cardDivs).map((aspectDiv) => {
    const img = aspectDiv.querySelector('img');
    // Only image is present, no text available
    return [img, ''];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
