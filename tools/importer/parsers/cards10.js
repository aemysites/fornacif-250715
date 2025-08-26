/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header exactly as required
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // 2. Get all direct card-link children
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach(card => {
    // a) Image cell: get first image in the card
    const img = card.querySelector('img');
    const imgCell = img || '';

    // b) Text cell: get utility-padding-all-1rem content
    const textContainer = card.querySelector('div.utility-padding-all-1rem');
    let textCell = '';
    if (textContainer) {
      textCell = textContainer;
    }

    rows.push([imgCell, textCell]);
  });

  // 3. Create block table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
