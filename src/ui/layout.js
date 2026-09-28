import { createElement as el } from './createElement.js';

export function createLayout() {
  const newGame = el('button', { text: 'New Game', attributes: { type: 'button' } });
  const leaderboard = el('button', { text: 'Leaderboard', attributes: { type: 'button' } });
  const moves = el('p', { text: 'Moves: 0' });
  const pairs = el('p', { text: 'Pairs: 0 / 8' });
  const board = el('section', { className: 'board', attributes: { 'aria-label': 'Memory cards' } });
  const app = el('main', { className: 'app', children: [
    el('header', { className: 'header', children: [
      el('div', { children: [
        el('p', { className: 'eyebrow', text: 'A little moment of focus' }),
        el('h1', { text: 'Memory Garden' }),
      ] }),
      el('nav', { attributes: { 'aria-label': 'Game controls' }, children: [newGame, leaderboard] }),
    ] }),
    el('p', { className: 'intro', text: 'Turn a card. Find its companion. Grow your memory.' }),
    el('div', { className: 'counters', attributes: { 'aria-live': 'polite', 'aria-atomic': 'true' }, children: [moves, pairs] }),
    board,
    el('p', { className: 'hint', text: '16 cards · 8 pairs · Take your time' }),
  ] });
  document.body.append(app);
  return { app, newGame, leaderboard, board, moves, pairs };
}
