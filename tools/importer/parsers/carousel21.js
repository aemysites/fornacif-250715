/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per example
  const headerRow = ['Carousel (carousel21)'];

  // Helper to find the .card-body section
  let cardBody = null;
  let current = element;
  // Traverse to the deepest .card-body
  while (current && !current.classList.contains('card-body')) {
    current = current.querySelector(':scope > div');
  }
  if (current && current.classList.contains('card-body')) {
    cardBody = current;
  }

  // Extract image (first cell)
  let img = cardBody ? cardBody.querySelector('img') : null;

  // Extract heading and any text (second cell)
  let textCellContent = [];
  if (cardBody) {
    // Heading: use the existing element if present
    const heading = cardBody.querySelector('.h4-heading');
    if (heading) {
      textCellContent.push(heading);
    }
    // If there are other textual elements, add them (none in this HTML)
    // For robustness, include <p> elements if present
    const paragraphs = cardBody.querySelectorAll('p');
    paragraphs.forEach(p => textCellContent.push(p));
  }

  // Create slide row
  const slideRow = [img || '', textCellContent.length > 0 ? textCellContent : ''];
  const tableCells = [headerRow, slideRow];

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
