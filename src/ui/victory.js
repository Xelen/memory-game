import { createElement as el } from './createElement.js';

export function showVictory(modal, moves, onNewGame) {
  const newGame = el('button', { className: 'primary', text: 'New Game', attributes: { type: 'button' } });
  newGame.addEventListener('click', onNewGame);
  modal.open('You won!', [
    el('p', { className: 'victory-flower', text: '✿', attributes: { 'aria-hidden': 'true' } }),
    el('p', { text: 'Every pair found. A lovely little achievement.' }),
    el('p', { className: 'result', text: `Moves: ${moves}` }),
    newGame,
  ]);
}
