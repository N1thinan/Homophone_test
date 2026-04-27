import { useState } from 'react';
import StartScreen from './components/StartScreen';
import ExamContainer from './components/ExamContainer';
import './App.css';

function App() {
  const [config, setConfig] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎧 Homophone Quiz</h1>
        <p>Listen and pick the word you heard.</p>
      </header>
      <main>
        {config ? (
          <ExamContainer config={config} onExit={() => setConfig(null)} />
        ) : (
          <StartScreen onStart={setConfig} />
        )}
      </main>
    </div>
  );
}

export default App;
