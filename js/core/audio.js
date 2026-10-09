// Read-aloud for mantras using the browser's speech engine (no downloads).
// Sanskrit is read with a Hindi or Nepali voice when one is installed.

function canSpeak() { return typeof window !== 'undefined' && 'speechSynthesis' in window; }

function speak(text) {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  if (synth.speaking) { synth.cancel(); return; } // second tap stops
  const u = new SpeechSynthesisUtterance(text.replace(/[।॥|]+/g, ', '));
  const voices = synth.getVoices();
  const v = voices.find(x => /^ne/i.test(x.lang)) || voices.find(x => /^hi/i.test(x.lang)) ||
    voices.find(x => /^mr/i.test(x.lang));
  if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'hi-IN';
  u.rate = 0.8;
  synth.speak(u);
}

function stopSpeaking() { if (canSpeak()) window.speechSynthesis.cancel(); }
