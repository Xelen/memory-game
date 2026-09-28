import { createElement as el } from './createElement.js';

export function showLeaderboard(modal, results) {
  if (!results.length) {
    modal.open('Leaderboard', [el('p', { text: 'No results yet. Find all eight pairs to plant your first score.' })]);
    return;
  }
  const header = el('thead', { children: [el('tr', { children:
    ['Place', 'Moves', 'Date'].map((text) => el('th', { text, attributes: { scope: 'col' } })),
  })] });
  const body = el('tbody', { children: results.map((result, index) =>
    el('tr', { children: [index + 1, result.moves, result.date].map((text) => el('td', { text })) })),
  });
  modal.open('Leaderboard', [el('table', { children: [
    el('caption', { text: 'Your 10 best games · Fewest moves first' }), header, body,
  ] })]);
}
