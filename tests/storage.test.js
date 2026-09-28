import test from 'node:test';
import assert from 'node:assert/strict';
import { addResult, formatDate, loadResults, saveResults, sortResults } from '../src/storage/leaderboardStorage.js';

test('leaderboard orders ties by earliest timestamp and limits to ten', () => {
  const results = Array.from({ length: 12 }, (_, i) => ({ moves: 8 + i % 2, timestamp: 100 - i }));
  const sorted = sortResults(results);
  assert.equal(sorted.length, 10);
  assert.deepEqual(sorted[0], { moves: 8, timestamp: 90 });
  assert.equal(sorted[5].moves, 8);
  assert.equal(results.length, 12);
});

test('storage persists results, rejects malformed data, and tolerates unavailable storage', (t) => {
  let stored = null;
  t.mock.method(globalThis, 'Date', Date);
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: () => stored,
    setItem: (key, value) => { assert.equal(key, 'memory-game-results'); stored = value; },
  } });
  t.after(() => { delete globalThis.localStorage; });
  assert.deepEqual(loadResults(), []);
  assert.equal(addResult(12), true);
  assert.equal(loadResults()[0].moves, 12);
  assert.match(loadResults()[0].date, /^\d{2}\.\d{2}\.\d{4}$/);
  stored = '{broken';
  assert.deepEqual(loadResults(), []);
  stored = '[null,{"moves":-1},{"moves":8,"date":"bad","timestamp":0}]';
  assert.deepEqual(loadResults(), []);
  stored = '{}';
  assert.deepEqual(loadResults(), []);
  globalThis.localStorage.setItem = () => { throw new Error('blocked'); };
  assert.equal(saveResults([]), false);
  globalThis.localStorage.getItem = () => { throw new Error('blocked'); };
  assert.deepEqual(loadResults(), []);
});

test('dates use local day, month and year without time', () => {
  assert.equal(formatDate(new Date(2026, 0, 5)), '05.01.2026');
});
