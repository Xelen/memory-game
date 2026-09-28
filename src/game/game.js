import { createDeck } from './deck.js';

export function createGame(onChange = () => {}) {
  const state = {
    cards: createDeck(), moves: 0, pairs: 0,
    selected: [], locked: false, finished: false,
  };
  let mismatchTimeoutId = null;

  function selectCard(id) {
    const card = state.cards.find((item) => item.id === id);
    if (!card || state.finished || state.locked || card.state !== 'closed') return;
    card.state = 'opened';
    state.selected.push(card);

    if (state.selected.length === 2) {
      state.moves += 1;
      const [first, second] = state.selected;
      if (first.type === second.type) {
        first.state = 'matched';
        second.state = 'matched';
        state.pairs += 1;
        state.selected = [];
        state.finished = state.pairs === state.cards.length / 2;
      } else {
        state.locked = true;
        mismatchTimeoutId = setTimeout(() => {
          first.state = 'closed';
          second.state = 'closed';
          state.selected = [];
          state.locked = false;
          mismatchTimeoutId = null;
          onChange(state);
        }, 1000);
      }
    }
    onChange(state);
  }

  return { state, selectCard };
}
