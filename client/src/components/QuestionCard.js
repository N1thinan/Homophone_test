import { useEffect, useState } from 'react';
import { speak } from '../speech';
import '../styles/QuestionCard.css';

const QuestionCard = ({ question, options, targetWord, autoPlay, onAnswer }) => {
  const [playing, setPlaying] = useState(false);

  const play = () => {
    if (!targetWord) return;
    setPlaying(true);
    speak(targetWord, { rate: 0.85 });
    // SpeechSynthesisUtterance doesn't reliably fire onend across browsers,
    // so just clear the playing flag after a reasonable max duration.
    setTimeout(() => setPlaying(false), 1200);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const t = setTimeout(play, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetWord]);

  return (
    <div className="question-card">
      <h2>What word did you hear?</h2>

      <button
        className={`play-button ${playing ? 'playing' : ''}`}
        onClick={play}
      >
        {playing ? '🔊 Playing…' : '🔊 Play audio'}
      </button>

      <div className="answer-options">
        {options.map((word) => (
          <button
            key={word}
            className="option-button"
            onClick={() => onAnswer(word)}
          >
            <span className="option-label">{word}</span>
            <span className="option-meaning">
              {question.definitions[word]}
            </span>
            <span className="option-example">
              "{question.examples[word]}"
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
