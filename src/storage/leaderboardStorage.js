const LEADERBOARD_KEY = 'memory-game-results';

export function formatDate(date) {
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map((part) => String(part).padStart(2, '0')).join('.');
}

export function sortResults(results) {
  return [...results].sort((a, b) => a.moves - b.moves || a.timestamp - b.timestamp).slice(0, 10);
}

export function loadResults() {
  try {
    const results = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]');
    if (!Array.isArray(results)) return [];
    return sortResults(results.filter((result) => result &&
      Number.isInteger(result.moves) && result.moves >= 8 &&
      Number.isFinite(result.timestamp) && result.timestamp >= 0 &&
      !Number.isNaN(new Date(result.timestamp).getTime()) &&
      typeof result.date === 'string' && result.date === formatDate(new Date(result.timestamp))));
  } catch {
    return [];
  }
}

export function saveResults(results) {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sortResults(results)));
    return true;
  } catch {
    return false;
  }
}

export function addResult(moves) {
  const date = new Date();
  return saveResults([...loadResults(), { moves, date: formatDate(date), timestamp: date.getTime() }]);
}
