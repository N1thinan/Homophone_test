// Self-contained quiz data + selection logic. Used by both the web build
// and the Capacitor Android wrapper, so the app works fully offline.
import wordPairs from './data/word-pairs.json';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const buildQuiz = ({ count = 10, difficulty = 'all' } = {}) => {
  let pool = wordPairs;
  if (difficulty && difficulty !== 'all') {
    const filtered = wordPairs.filter((p) => p.difficulty === difficulty);
    if (filtered.length) pool = filtered;
  }
  const n = Math.max(1, Math.min(count, pool.length));
  return shuffle(pool)
    .slice(0, n)
    .map((p) => ({
      ...p,
      target: p.pair[Math.random() < 0.5 ? 0 : 1],
    }));
};

export const totalPairs = wordPairs.length;
