/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // There are 2 main columns visually, but the structure is:
  // - Left column: first <a> (main block)
  // - Right column: 1st div (horizontal flex with 2 <a> cards), and 2nd div (vertical flex with 6 <a> cards)
  // We'll combine the two right-side flex containers into one column (as example is 2 columns)

  // Get first <a> child of grid (main left card)
  const leftCard = grid.querySelector('a.utility-link-content-block');

  // Get the two vertical flex containers (right column blocks)
  const rightBlocks = grid.querySelectorAll('div.flex-horizontal');
  // We'll combine them into a fragment
  const rightColumn = document.createDocumentFragment();
  rightBlocks.forEach(div => {
    rightColumn.appendChild(div);
  });

  // Compose table rows
  const headerRow = ['Columns (columns2)'];
  const contentRow = [leftCard, rightColumn];

  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
