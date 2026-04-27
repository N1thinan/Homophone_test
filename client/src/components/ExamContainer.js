import { useEffect, useState, useCallback } from 'react';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import ResultsScreen from './ResultsScreen';
import { warmUpVoices, isSpeechSupported } from '../speech';
import { buildQuiz } from '../quizData';
import '../styles/ExamContainer.css';

const ExamContainer = ({ config, onExit }) => {
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [displayOrder, setDisplayOrder] = useState({});
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const loadQuiz = useCallback(async () => {
    setStatus('loading');
    setError('');
    try {
      if (!isSpeechSupported()) {
        throw new Error(
          'Your browser does not support speech synthesis. Please use Chrome, Edge, or Safari.'
        );
      }
      await warmUpVoices();

      const data = buildQuiz(config);

      const order = {};
      data.forEach((q) => {
        order[q.id] = Math.random() < 0.5;
      });

      setQuiz(data);
      setDisplayOrder(order);
      setIndex(0);
      setAnswers({});
      setStatus('ready');
    } catch (err) {
      setError(err.message || 'Failed to start quiz.');
      setStatus('error');
    }
  }, [config]);

  useEffect(() => {
    loadQuiz();
    return () => {
      if (isSpeechSupported()) window.speechSynthesis.cancel();
    };
  }, [loadQuiz]);

  const handleAnswer = (selected) => {
    const q = quiz[index];
    const isCorrect = selected === q.target;
    setAnswers((prev) => ({
      ...prev,
      [q.id]: { selected, target: q.target, isCorrect, pair: q },
    }));
    if (index < quiz.length - 1) {
      setIndex(index + 1);
    } else {
      setStatus('done');
    }
  };

  if (status === 'loading') {
    return (
      <div className="centered-message">
        <div className="spinner" />
        <p>Loading quiz…</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="centered-message error">
        <p>{error}</p>
        <div className="btn-row">
          <button onClick={loadQuiz}>Retry</button>
          <button className="ghost" onClick={onExit}>Back</button>
        </div>
      </div>
    );
  }

  if (status === 'done') {
    return (
      <ResultsScreen
        answers={answers}
        quiz={quiz}
        onRetry={loadQuiz}
        onExit={onExit}
      />
    );
  }

  const current = quiz[index];
  const flipped = displayOrder[current.id];
  const options = flipped
    ? [current.pair[1], current.pair[0]]
    : [current.pair[0], current.pair[1]];

  return (
    <div className="exam-container">
      <ProgressBar current={index + 1} total={quiz.length} />
      <QuestionCard
        key={current.id}
        question={current}
        options={options}
        targetWord={current.target}
        autoPlay={index > 0}
        onAnswer={handleAnswer}
      />
      <button className="exit-link" onClick={onExit}>
        ← Exit quiz
      </button>
    </div>
  );
};

export default ExamContainer;
