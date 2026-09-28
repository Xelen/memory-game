import test from 'node:test';
import assert from 'node:assert/strict';
import { createGame } from '../src/game/game.js';

test('first card waits; duplicate clicks do not count; matches stay open', () => {
  const game = createGame();
  const [first] = game.state.cards;
  const second = game.state.cards.find((card) => card.type === first.type && card !== first);
  game.selectCard(first.id);
  game.selectCard(first.id);
  assert.equal(first.state, 'opened');
  assert.equal(game.state.moves, 0);
  game.selectCard(second.id);
  game.selectCard(first.id);
  assert.equal(game.state.moves, 1);
  assert.equal(game.state.pairs, 1);
  assert.equal(first.state, 'matched');
  assert.equal(second.state, 'matched');
});

test('mismatch locks other cards and closes exactly after one second', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const game = createGame();
  const [first] = game.state.cards;
  const second = game.state.cards.find((card) => card.type !== first.type);
  const third = game.state.cards.find((card) => card !== first && card !== second);
  game.selectCard(first.id);
  game.selectCard(second.id);
  game.selectCard(third.id);
  assert.equal(third.state, 'closed');
  assert.equal(game.state.moves, 1);
  t.mock.timers.tick(999);
  assert.equal(first.state, 'opened');
  t.mock.timers.tick(1);
  assert.equal(first.state, 'closed');
  assert.equal(second.state, 'closed');
  assert.equal(game.state.locked, false);
  game.selectCard(third.id);
  assert.equal(third.state, 'opened');
});

test('all pairs finish the game once and further clicks do nothing', () => {
  let finishes = 0;
  const game = createGame((state) => { if (state.finished) finishes += 1; });
  for (const type of new Set(game.state.cards.map((card) => card.type))) {
    game.state.cards.filter((card) => card.type === type).forEach((card) => game.selectCard(card.id));
  }
  game.state.cards.forEach((card) => game.selectCard(card.id));
  assert.equal(game.state.finished, true);
  assert.equal(game.state.moves, 8);
  assert.equal(game.state.pairs, 8);
  assert.equal(finishes, 1);
});
