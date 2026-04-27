// Browser text-to-speech wrapper. Picks the most natural English voice
// available and exposes a single `speak(word)` function the UI can call.

let cachedVoice = null;

const pickVoice = () => {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const english = voices.filter((v) => /^en[-_]/i.test(v.lang));
  // Prefer en-US/en-GB natural-sounding voices when available
  const preferred =
    english.find((v) => /Google US English/i.test(v.name)) ||
    english.find((v) => /Google UK English/i.test(v.name)) ||
    english.find((v) => /Microsoft.*(Aria|Jenny|Guy|Zira|David)/i.test(v.name)) ||
    english.find((v) => /^en-US$/i.test(v.lang)) ||
    english[0] ||
    voices[0];
  return preferred;
};

export const isSpeechSupported = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window;

export const warmUpVoices = () =>
  new Promise((resolve) => {
    if (!isSpeechSupported()) return resolve();
    const ready = () => {
      cachedVoice = pickVoice();
      resolve();
    };
    if (window.speechSynthesis.getVoices().length) {
      ready();
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', ready, { once: true });
      // Fallback in case the event never fires (e.g. some Linux Chromiums)
      setTimeout(ready, 500);
    }
  });

export const speak = (word, { rate = 0.85 } = {}) => {
  if (!isSpeechSupported() || !word) return;
  const synth = window.speechSynthesis;
  synth.cancel(); // stop anything mid-flight
  const utter = new SpeechSynthesisUtterance(word);
  utter.voice = cachedVoice || pickVoice();
  utter.lang = utter.voice?.lang || 'en-US';
  utter.rate = rate;
  utter.pitch = 1;
  synth.speak(utter);
};
