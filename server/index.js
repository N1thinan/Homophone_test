const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data', 'word-pairs.json');

let wordPairs = [];
try {
  wordPairs = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (err) {
  console.error('Failed to load word-pairs.json:', err.message);
  process.exit(1);
}

console.log(`Loaded ${wordPairs.length} minimal pairs`);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    totalPairs: wordPairs.length,
  });
});

app.get('/api/word-pairs', (req, res) => {
  res.json(wordPairs);
});

app.get('/api/quiz/random', (req, res) => {
  const count = Math.max(1, Math.min(parseInt(req.query.count, 10) || 10, wordPairs.length));
  const difficulty = req.query.difficulty;

  let pool = wordPairs;
  if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
    pool = wordPairs.filter((p) => p.difficulty === difficulty);
  }
  if (pool.length === 0) pool = wordPairs;

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  // Pre-decide which word in the pair is the "correct" answer (the one whose audio plays)
  const quiz = selected.map((p) => ({
    ...p,
    target: p.pair[Math.random() < 0.5 ? 0 : 1],
  }));

  res.json(quiz);
});

const server = app.listen(PORT, () => {
  console.log(`\nMinimal-Pair Quiz API`);
  console.log(`  Server : http://localhost:${PORT}`);
  console.log(`  Health : http://localhost:${PORT}/api/health\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[ERROR] Port ${PORT} is already in use.`);
    console.error(`Another process (probably an old server) is bound there.`);
    console.error(`Open Task Manager and end all 'Node.js' processes, then retry.\n`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});

process.on('SIGINT', () => server.close(() => process.exit(0)));
process.on('SIGTERM', () => server.close(() => process.exit(0)));
