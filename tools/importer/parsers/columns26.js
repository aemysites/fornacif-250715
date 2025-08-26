/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Columns (columns26)'];

  // Find main content container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid containing the columns
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.y-bottom');
  if (!mainGrid) return;

  // --- First row: left and right cells ---
  // Left: heading, quote, divider, author info
  const heading = mainGrid.querySelector('p.h2-heading');
  const quote = mainGrid.querySelector('p.paragraph-lg');
  const innerGrid = mainGrid.querySelector('.w-layout-grid.grid-layout.w-node-_3ef8ef40-2915-728f-b826-c7b8d23344dd-34b92918');
  const divider = innerGrid ? innerGrid.querySelector('.divider') : null;
  const flexRow = innerGrid ? innerGrid.querySelector('.flex-horizontal.y-center') : null;
  const svgLogo = innerGrid ? innerGrid.querySelector('svg') : null;

  // Compose left cell (first row)
  const leftCellTop = document.createElement('div');
  if (heading) leftCellTop.appendChild(heading);
  if (quote) leftCellTop.appendChild(quote);
  if (divider) leftCellTop.appendChild(divider);
  if (flexRow) leftCellTop.appendChild(flexRow);

  // Compose right cell (first row)
  const rightCellTop = document.createElement('div');
  if (svgLogo) rightCellTop.appendChild(svgLogo);

  // --- Second row: both cells empty ---
  // To match example markdown structure, create empty cells
  const leftCellBottom = document.createElement('div');
  const rightCellBottom = document.createElement('div');

  // Compose block cells: header, then two rows of two columns
  const cells = [
    headerRow,
    [leftCellTop, rightCellTop],
    [leftCellBottom, rightCellBottom]
  ];

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
