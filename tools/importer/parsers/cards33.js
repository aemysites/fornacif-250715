/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const rows = [['Cards (cards33)']];

  // Get all direct child <a> elements (cards)
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach((card) => {
    // Image in the first cell
    const img = card.querySelector('img');
    // Text content in the second cell
    // The content container is the first div inside the card (skipping the image)
    // It contains: flex-horizontal (tag+min), heading, p, and 'Read'
    const contentGrid = card.querySelector(':scope > div');
    // Sometimes the structure is wrapped in an extra div; reliably get the div after image
    let contentCol = null;
    for (const child of card.children) {
      if (child.tagName === 'DIV') {
        contentCol = child;
        break;
      }
    }
    // Fallback in case not found
    if (!contentCol) contentCol = card;

    // Compose the second cell content
    const cellElements = [];

    // Tag and time meta (the flex-horizontal row, if present)
    const meta = contentCol.querySelector('.flex-horizontal');
    if (meta) cellElements.push(meta);

    // Heading (h3 or .h4-heading)
    const heading = contentCol.querySelector('h3, .h4-heading');
    if (heading) cellElements.push(heading);

    // Description (p)
    const desc = contentCol.querySelector('p');
    if (desc) cellElements.push(desc);

    // CTA ("Read")
    // Look for a div whose text is 'Read', and produce a link with the card's href
    // Only add if present
    const ctaDiv = Array.from(contentCol.querySelectorAll('div')).find(div => div.textContent.trim().toLowerCase() === 'read');
    if (ctaDiv) {
      const cta = document.createElement('a');
      cta.href = card.href;
      cta.textContent = 'Read';
      cellElements.push(cta);
    }

    // Add row: [img, [content...]]
    // Reference the existing img element and content elements directly (do not clone)
    rows.push([img, cellElements]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}