import { cardTypes } from '../data/cards.js';
import { shuffle } from './shuffle.js';

export function createDeck() {
  return shuffle(cardTypes.flatMap((card) => [0, 1].map((copy) => ({
    ...card, id: `${card.type}-${copy}`, state: 'closed',
  }))));
}
