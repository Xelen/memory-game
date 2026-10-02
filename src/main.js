import './style.css';
import { createLayout } from './ui/layout.js';
import { createGame } from './game/game.js';
import { renderBoard } from './ui/board.js';
import { createModal } from './ui/modal.js';
import { showVictory } from './ui/victory.js';
import { showLeaderboard } from './ui/leaderboard.js';
import { addResult, loadResults } from './storage/leaderboardStorage.js';

const ui = createLayout();
const modal = createModal();
const game = createGame(updateGame);
let renderedCards = null;
let updateBoard;
ui.leaderboard.addEventListener('click', () => showLeaderboard(modal, loadResults()));
ui.newGame.addEventListener('click', startNewGame);

function startNewGame() {
  modal.close();
  game.startNewGame();
  ui.newGame.focus();
}

function updateGame(state) {
  if (renderedCards !== state.cards) {
    renderedCards = state.cards;
    updateBoard = renderBoard(ui.board, state.cards, game.selectCard);
  }
  updateBoard();
  ui.moves.textContent = `Moves: ${state.moves}`;
  ui.pairs.textContent = `Pairs: ${state.pairs} / 8`;
  if (state.finished) {
    const saved = addResult(state.moves);
    showVictory(modal, state.moves, startNewGame, saved);
  }
}

updateGame(game.state);
