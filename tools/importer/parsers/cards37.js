/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to assemble text/cta for a card
  function buildTextCell(card) {
    // Find all headings (h2, h3, h4) in order
    const headings = Array.from(card.querySelectorAll('h2, h3, h4'));
    // Find all paragraphs
    const paras = Array.from(card.querySelectorAll('p'));
    // CTA: look for a.button, button, .button (not img, not a[href^=mailto])
    let cta = card.querySelector('a.button, button, .button');
    // If cta is a div.button inside a link, reference the link
    if (cta && cta.tagName === 'DIV' && cta.parentElement && cta.parentElement.tagName === 'A') {
      cta = cta.parentElement;
    }
    // Sometimes the button is a div alone; keep as-is
    // Build fragment
    const frag = document.createDocumentFragment();
    headings.forEach(h => frag.appendChild(h));
    paras.forEach(p => frag.appendChild(p));
    if (cta) frag.appendChild(cta);
    return frag;
  }

  // Find the main grid holding all cards
  let mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return; // Defensive: no cards

  // Gather card elements: either direct children, or first child + nested grid
  let cards = [];
  const children = Array.from(mainGrid.children);
  if (children.length === 2 && children[1].classList.contains('w-layout-grid')) {
    cards.push(children[0]);
    cards = cards.concat(Array.from(children[1].children));
  } else {
    cards = children;
  }

  // Start table rows
  const rows = [];
  rows.push(['Cards (cards37)']); // Block name as header, per instructions

  // For each card, build two cells: image, text content
  cards.forEach(card => {
    // Image: find first img inside card
    const img = card.querySelector('img');
    // Text: heading(s), paragraph(s), CTA
    const textCell = buildTextCell(card);
    rows.push([img, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
