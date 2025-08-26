/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in the example
  const headerRow = ['Cards (cards24)'];
  // Get all direct card links
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  // Build rows for each card
  const rows = cards.map(card => {
    // First cell: image
    let img = null;
    const imgDiv = card.querySelector('.utility-aspect-2x3');
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }
    // Second cell: Composed textual content
    const secondCell = document.createElement('div');
    // Tag and date (in a flex row)
    const meta = card.querySelector('.flex-horizontal');
    if (meta) {
      // Use reference to existing meta row
      secondCell.appendChild(meta);
    }
    // Title/heading
    const heading = card.querySelector('.h4-heading, h3, h4');
    if (heading) {
      secondCell.appendChild(heading);
    }
    return [img, secondCell];
  });
  // Build final cells array and replace
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
