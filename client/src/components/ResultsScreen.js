import '../styles/ResultsScreen.css';

const grade = (pct) => {
  if (pct >= 90) return 'A';
  if (pct >= 80) return 'B';
  if (pct >= 70) return 'C';
  if (pct >= 60) return 'D';
  return 'F';
};

const ResultsScreen = ({ answers, quiz, onRetry, onExit }) => {
  const total = quiz.length;
  const correct = Object.values(answers).filter((a) => a.isCorrect).length;
  const pct = Math.round((correct / total) * 100);

  return (
    <div className="results-screen">
      <h1>Quiz Complete 🎉</h1>

      <div className="score-card">
        <div className="score-value">{pct}%</div>
        <div className="grade-badge">{grade(pct)}</div>
        <div className="score-detail">
          {correct} of {total} correct
        </div>
      </div>

      <h2>Review</h2>
      <div className="review-list">
        {quiz.map((q) => {
          const a = answers[q.id];
          if (!a) return null;
          return (
            <div
              key={q.id}
              className={`review-item ${a.isCorrect ? 'correct' : 'incorrect'}`}
            >
              <div className="review-icon">{a.isCorrect ? '✓' : '✗'}</div>
              <div className="review-body">
                <div className="review-pair">
                  <strong>{q.pair[0]}</strong> / <strong>{q.pair[1]}</strong>
                </div>
                <div className="review-line">
                  Heard: <span className="bold">{a.target}</span>
                </div>
                <div className="review-line">
                  Your answer:{' '}
                  <span className={a.isCorrect ? 'good' : 'bad'}>
                    {a.selected}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="btn-row">
        <button className="primary" onClick={onRetry}>
          Try again
        </button>
        <button className="ghost" onClick={onExit}>
          Back to menu
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
