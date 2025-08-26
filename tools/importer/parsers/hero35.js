/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero35)'];

  // 2. Find the main grid (contains two columns: text and CTA)
  const grid = element.querySelector('.grid-layout');

  // Defensive: If grid not found, fallback to the original element's children
  let gridChildren = [];
  if (grid) {
    gridChildren = Array.from(grid.children);
  } else {
    gridChildren = Array.from(element.children);
  }

  // 3. Extract the content (headings, subheading, etc.) and the CTA (link/button)
  let contentBlock = null;
  let ctaBlock = null;
  gridChildren.forEach(child => {
    if (!contentBlock && child.querySelector && child.querySelector('h1, h2, h3, h4, h5, h6')) {
      contentBlock = child;
    } else if (!ctaBlock && (child.tagName === 'A' || child.tagName === 'BUTTON')) {
      ctaBlock = child;
    }
  });

  // 4. Assemble cell content for the content/CTA row
  const cellContent = [];
  if (contentBlock) cellContent.push(contentBlock);
  if (ctaBlock) cellContent.push(ctaBlock);

  // 5. Background image row (empty, as none exists in the provided HTML)
  const backgroundRow = [''];

  // 6. Compose table cells: header, background image, then content/cta
  const cells = [
    headerRow,
    backgroundRow,
    [cellContent]
  ];

  // 7. Create and replace with table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
