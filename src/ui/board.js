import { createElement as el } from './createElement.js';

export function renderBoard(board, cards, onSelect = () => {}) {
  const buttons = cards.map((card, index) => {
    const button = el('button', {
      className: 'card', text: '✿',
      attributes: { type: 'button', 'aria-label': `Card ${index + 1}, face down` },
    });
    button.addEventListener('click', () => onSelect(card.id));
    return button;
  });
  board.replaceChildren(...buttons);
  return function updateBoard() {
    cards.forEach((card, index) => {
      const button = buttons[index];
      const closed = card.state === 'closed';
      button.textContent = closed ? '✿' : card.symbol;
      button.dataset.state = card.state;
      button.setAttribute('aria-label', `Card ${index + 1}, ${closed ? 'face down' : card.name}${card.state === 'matched' ? ', matched' : ''}`);
      button.setAttribute('aria-disabled', String(!closed));
    });
  };
}
