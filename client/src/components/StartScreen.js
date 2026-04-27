import { useState } from 'react';
import '../styles/StartScreen.css';

const COUNTS = [10, 20, 30, 50];
const LEVELS = [
  { value: 'all', label: 'All' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

const StartScreen = ({ onStart }) => {
  const [count, setCount] = useState(20);
  const [difficulty, setDifficulty] = useState('all');

  return (
    <div className="start-screen">
      <h2>Ready to test your ear?</h2>
      <p className="lead">
        You'll hear a recording of one word. Pick which of the two homophones
        you heard.
      </p>

      <div className="setting-group">
        <label>Number of questions</label>
        <div className="pill-row">
          {COUNTS.map((c) => (
            <button
              key={c}
              className={`pill ${count === c ? 'active' : ''}`}
              onClick={() => setCount(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="setting-group">
        <label>Difficulty</label>
        <div className="pill-row">
          {LEVELS.map((l) => (
            <button
              key={l.value}
              className={`pill ${difficulty === l.value ? 'active' : ''}`}
              onClick={() => setDifficulty(l.value)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <button
        className="start-button"
        onClick={() => onStart({ count, difficulty })}
      >
        Start Quiz →
      </button>
    </div>
  );
};

export default StartScreen;
