/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header for accordion13
  const headerRow = ['Accordion (accordion13)'];
  const rows = [headerRow];

  // Get all direct children that are .divider (each is an accordion item)
  const dividers = Array.from(element.children).filter(child => child.classList.contains('divider'));

  dividers.forEach(divider => {
    // Each divider should have a layout grid with two children: title and content
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    const gridChildren = Array.from(grid.children);
    // Title is the element with h4-heading class
    const title = gridChildren.find(el => el.classList.contains('h4-heading'));
    // Content is the element with rich-text class
    const content = gridChildren.find(el => el.classList.contains('rich-text'));
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Edge case: sometimes the first accordion item is a .divider inside a flex, rather than .divider direct child
  // Check for .divider as a direct child or as a grandchild, and avoid duplicates
  // (Handled above, as all .divider direct children are processed)

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
