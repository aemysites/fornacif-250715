/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero6)'];

  // Extract background image (should be the cover-image img)
  const bgImage = element.querySelector('img.cover-image');
  const imageRow = [bgImage ? bgImage : ''];

  // Extract content: heading, subheading, CTA(s) from card
  const card = element.querySelector('.card');
  const contentParts = [];
  if (card) {
    // Heading (h1)
    const heading = card.querySelector('h1');
    if (heading) contentParts.push(heading);
    // Subheading (p)
    const subheading = card.querySelector('p');
    if (subheading) contentParts.push(subheading);
    // CTAs (a.buttons)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      if (buttons.length > 0) contentParts.push(...buttons);
    }
  }
  const contentRow = [contentParts.length > 0 ? contentParts : ''];

  // Compose the table structure
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
