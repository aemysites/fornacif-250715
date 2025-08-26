/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block guidelines
  const headerRow = ['Cards (cards25)'];
  const rows = [];

  // Get immediate children of the grid that could be cards
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  cardDivs.forEach(cardDiv => {
    // Find image (first img), if present
    const img = cardDiv.querySelector('img');
    // Text: Try to find a caption container (utility-padding-all-2rem)
    let textCell = null;
    const textWrap = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textWrap) {
      textCell = textWrap; // Use the whole block, keeps original heading and paragraph
    } else {
      // fallback: look for any h3/h2/h1 and p inside
      const heading = cardDiv.querySelector('h1,h2,h3');
      const para = cardDiv.querySelector('p');
      if (heading && para) {
        const container = document.createElement('div');
        container.append(heading, para);
        textCell = container;
      } else if (heading) {
        textCell = heading;
      } else if (para) {
        textCell = para;
      } else {
        textCell = document.createTextNode(''); // Empty fallback
      }
    }
    // Only add row if at least an image present (matches cards in this block)
    if (img) {
      rows.push([img, textCell]);
    }
  });

  // Prepend header row
  rows.unshift(headerRow);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
