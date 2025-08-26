/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example exactly
  const headerRow = ['Hero (hero12)'];

  // --- 2nd row: Background Image (optional) ---
  // Find the background image div: it's the first child div containing an img
  const gridRoot = element.querySelector('.w-layout-grid.grid-layout.desktop-1-column');
  let bgImg = '';
  if (gridRoot) {
    const divs = gridRoot.querySelectorAll(':scope > div');
    for (const div of divs) {
      const img = div.querySelector('img');
      if (img) {
        bgImg = img;
        break;
      }
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // --- 3rd row: Main content ---
  // Card with headline, subheadings, CTA, etc
  let mainContent = '';
  if (gridRoot) {
    const divs = gridRoot.querySelectorAll(':scope > div');
    // Find the container with main card (skip bg image div)
    for (const div of divs) {
      // Heuristic: the one containing a '.card-body' is main content
      if (div.querySelector('.card-body')) {
        // We want the entire grid inside the card body for resilience
        const cardBody = div.querySelector('.card-body');
        if (cardBody) {
          // Get grid with left image and right content
          const innerGrid = cardBody.querySelector('.w-layout-grid');
          if (innerGrid) {
            mainContent = innerGrid;
          } else {
            // fallback: use whole cardBody
            mainContent = cardBody;
          }
        }
        break;
      }
    }
  }
  const mainContentRow = [mainContent ? mainContent : ''];

  // Compose the block table as per the example (1 col, 3 rows)
  const cells = [
    headerRow,
    bgImgRow,
    mainContentRow
  ];

  // Create table and replace original
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
