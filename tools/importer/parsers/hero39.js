/* global WebImporter */
export default function parse(element, { document }) {
  // Row 1: Block header
  const headerRow = ['Hero (hero39)'];

  // Row 2: Background image (optional)
  let bgImg = '';
  // The structure is: header > div.grid-layout > [div image, div content]
  // The image is in the FIRST child grid cell, as an <img>
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (grid) {
    const firstGridCell = grid.children[0];
    if (firstGridCell) {
      const img = firstGridCell.querySelector('img');
      if (img) {
        bgImg = img;
      }
    }
  }

  // Row 3: Content block: heading, paragraph, cta
  let contentBlock = '';
  // The content is in the SECOND grid cell
  if (grid && grid.children.length > 1) {
    // The second grid cell contains a container, which contains a grid
    const contentCell = grid.children[1];
    let contentContainer = contentCell;
    // Sometimes content is further nested in a grid
    const nestedGrid = contentCell.querySelector('.w-layout-grid');
    if (nestedGrid) {
      contentContainer = nestedGrid;
    }
    // Compose a div containing the heading, paragraph, and cta
    const heading = contentContainer.querySelector('h1, h2, h3, h4, h5, h6');
    const paragraphs = contentContainer.querySelectorAll('p');
    const cta = contentContainer.querySelector('a.button, a.w-button, .button-group a, a');

    const wrap = document.createElement('div');
    if (heading) wrap.appendChild(heading);
    paragraphs.forEach(p => wrap.appendChild(p));
    if (cta) wrap.appendChild(cta);
    // Only use wrap if it has children
    if (wrap.childNodes.length) {
      contentBlock = wrap;
    }
  }

  const cells = [
    headerRow,
    [bgImg],
    [contentBlock]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
