import '../styles/ProgressBar.css';

const ProgressBar = ({ current, total }) => {
  const pct = (current / total) * 100;
  return (
    <div className="progress-bar-container">
      <div className="progress-info">
        <span>Question {current} of {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
