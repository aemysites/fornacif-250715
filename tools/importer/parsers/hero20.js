/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as specified
  const headerRow = ['Hero (hero20)'];

  // Row 2: Background images
  // Find the layout grid containing images
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  let bgCell = '';
  if (grid) {
    // Only direct image children in grid
    const imgs = Array.from(grid.querySelectorAll('img'));
    if (imgs.length > 0) {
      const imgWrap = document.createElement('div');
      imgs.forEach(img => imgWrap.appendChild(img));
      bgCell = imgWrap;
    }
  }

  // Row 3: Headline, subheading, CTA
  // Find the content container with headline, etc.
  let contentCell = '';
  const content = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (content) {
    contentCell = content;
  }

  // Assemble table
  const cells = [
    headerRow,
    [bgCell],
    [contentCell],
  ];

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
