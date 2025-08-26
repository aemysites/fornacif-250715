/* global WebImporter */
export default function parse(element, { document }) {
  // Get tab labels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a')) : [];

  // Get tabs content
  const tabContentWrap = element.querySelector('.w-tab-content');
  const tabPanes = tabContentWrap ? Array.from(tabContentWrap.querySelectorAll('.w-tab-pane')) : [];

  // Prepare header row (block name)
  const headerRow = ['Tabs'];
  const rows = [headerRow];

  // For each tab, extract label and content
  tabLinks.forEach((tabLink, idx) => {
    // Get tab label
    let label = '';
    // Prefer inner div for label, fallback to link text
    const labelDiv = tabLink.querySelector('div');
    label = labelDiv ? labelDiv.textContent.trim() : tabLink.textContent.trim();

    // Get corresponding tab content
    const pane = tabPanes[idx];
    let contentCell;
    if (pane) {
      // The main content is likely inside a grid-layout div in the pane
      // We take all direct children of pane. If only one child, reference that element directly.
      const paneChildren = Array.from(pane.children);
      if (paneChildren.length === 1) {
        contentCell = paneChildren[0]; // reference the grid-layout div directly
      } else if (paneChildren.length > 1) {
        contentCell = paneChildren; // fallback: reference all children
      } else {
        // Empty pane
        contentCell = '';
      }
    } else {
      // No pane found
      contentCell = '';
    }
    rows.push([label, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element with the block table
  element.replaceWith(block);
}
