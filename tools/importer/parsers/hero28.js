/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches example exactly
  const headerRow = ['Hero (hero28)'];

  // 2. Extract the background image (should reference original element)
  let imageRow = [''];
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    const bgContainer = gridDivs[0];
    const img = bgContainer.querySelector('img');
    if (img) {
      imageRow = [img];
    }
  }

  // 3. Extract Heading and content (should reference original elements)
  let contentRow = [''];
  if (gridDivs.length > 1) {
    const contentContainer = gridDivs[1];
    // Find container
    const textWrapper = contentContainer.querySelector('.utility-margin-bottom-6rem');
    if (textWrapper) {
      // Extract heading
      const heading = textWrapper.querySelector('h1, h2, h3, h4, h5, h6');
      // Extract button group (if not empty)
      const buttonGroup = textWrapper.querySelector('.button-group');
      if (heading && buttonGroup && buttonGroup.childNodes.length > 0) {
        contentRow = [[heading, buttonGroup]];
      } else if (heading) {
        contentRow = [heading];
      } else if (textWrapper.childNodes.length > 0) {
        contentRow = [textWrapper]; // fallback: all text
      }
    } else if (contentContainer.childNodes.length > 0) {
      contentRow = [contentContainer]; // fallback: all content
    }
  }

  // 4. Compose the table as in the example (1 column, 3 rows)
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // 5. Replace the element with the new block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
