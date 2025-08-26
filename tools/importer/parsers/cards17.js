/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards17)'];
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Extract the image (first img in card)
    const img = cardDiv.querySelector('img');
    // Attempt to extract any text content associated with the card
    // Likely candidates: direct children (besides the img), or text nodes
    // For each cardDiv, collect non-img elements and text nodes for the second cell
    const contentNodes = [];
    cardDiv.childNodes.forEach(node => {
      // Ignore the image node
      if (node.nodeType === 1 && node !== img) {
        // Element node and not the image
        contentNodes.push(node);
      } else if (node.nodeType === 3) {
        // Text node
        const text = node.textContent.trim();
        if (text) contentNodes.push(document.createTextNode(text));
      }
    });
    // If nothing found, provide empty string for text cell
    const textCell = contentNodes.length > 0 ? contentNodes : '';
    return [img, textCell];
  });
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
