import test from 'node:test';
import assert from 'node:assert/strict';
import { createDeck } from '../src/game/deck.js';
import { shuffle } from '../src/game/shuffle.js';

test('deck contains eight pairs with unique identities, all closed', () => {
  const cards = createDeck();
  assert.equal(cards.length, 16);
  assert.equal(new Set(cards.map((card) => card.id)).size, 16);
  const counts = new Map();
  cards.forEach((card) => {
    assert.equal(card.state, 'closed');
    counts.set(card.type, (counts.get(card.type) || 0) + 1);
  });
  assert.equal(counts.size, 8);
  assert.ok([...counts.values()].every((count) => count === 2));
});

test('shuffle preserves its input and all items', () => {
  const input = [1, 2, 3, 4];
  const output = shuffle(input);
  assert.notEqual(input, output);
  assert.deepEqual(input, [1, 2, 3, 4]);
  assert.deepEqual(output.toSorted(), input);
});
