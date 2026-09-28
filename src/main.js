import './style.css';
import { createLayout } from './ui/layout.js';
import { createDeck } from './game/deck.js';
import { renderBoard } from './ui/board.js';

const ui = createLayout();
renderBoard(ui.board, createDeck())();
