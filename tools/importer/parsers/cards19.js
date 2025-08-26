/* global WebImporter */
export default function parse(element, { document }) {
  // Table header - must match example exactly
  const headerRow = ['Cards (cards19)'];

  // Each card is a direct child <div> of the grid container
  const cardEls = Array.from(element.querySelectorAll(':scope > div'));

  // Compose table rows dynamically, referencing existing elements
  const rows = cardEls.map(cardEl => {
    // Left cell: Icon (SVG inside .icon)
    const iconDiv = cardEl.querySelector('.icon');
    const leftCell = iconDiv ? iconDiv : '';

    // Right cell: Text content (p tag)
    const p = cardEl.querySelector('p');
    const rightCell = p ? p : '';

    return [leftCell, rightCell];
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original block with the new table
  element.replaceWith(table);
}
