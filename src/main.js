import './style.css';
import { createLayout } from './ui/layout.js';
import { createGame } from './game/game.js';
import { renderBoard } from './ui/board.js';

const ui = createLayout();
const game = createGame(updateGame);
const updateBoard = renderBoard(ui.board, game.state.cards, game.selectCard);

function updateGame(state) {
  updateBoard();
  ui.moves.textContent = `Moves: ${state.moves}`;
  ui.pairs.textContent = `Pairs: ${state.pairs} / 8`;
}

updateGame(game.state);
