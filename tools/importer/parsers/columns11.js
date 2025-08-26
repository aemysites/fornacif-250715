/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Columns (columns11)'];

  // 2. Get the main grid with two columns (left: eyebrow and h1, right: text, author, button)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let leftColContent = [];
  let rightColContent = [];

  if (mainGrid) {
    const cols = Array.from(mainGrid.children);
    if (cols[0]) {
      // leftCol: eyebrow + h1
      leftColContent = Array.from(cols[0].childNodes).filter(n => {
        // filter out empty text nodes
        return n.nodeType !== 3 || n.textContent.trim().length > 0;
      });
    }
    if (cols[1]) {
      // rightCol: (paragraph, then div grid with author+button)
      rightColContent = Array.from(cols[1].children);
    }
  }

  // 3. Get the images grid (two images)
  const imgGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let img1 = null, img2 = null;
  if (imgGrid) {
    const imgDivs = Array.from(imgGrid.children).filter(div => div.querySelector('img'));
    if (imgDivs[0]) img1 = imgDivs[0].querySelector('img');
    if (imgDivs[1]) img2 = imgDivs[1].querySelector('img');
  }

  // Compose the rows for the table
  const row2 = [leftColContent, rightColContent];
  const row3 = [];
  if (img1 && img2) row3.push([img1], [img2]);

  const rows = [headerRow, row2];
  if (row3.length === 2) rows.push(row3);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}