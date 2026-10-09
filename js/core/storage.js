// App state. Everything the person sets lives here and stays on their device.
// Every storage call is wrapped: the app must work in private windows too.

const STORE_KEY = 'riti.v1';
const DEFAULT_STATE = {
  lang: 'ne',          // ne | hi | en
  fs: 18,              // base font size in px
  palette: 0,
  roman: false,        // show mantras in Roman letters
  city: 'kathmandu',
  tab: 'home',         // home | pujas | shraddha
  view: null,          // open guide inside a tab, e.g. 'daily', 'navaratri'
  sub: {},             // sub-tab per guide
  step: {},            // current step per guide
  puja: 'full',        // daily puja: full | short
  cal: null,           // { y, m } BS month shown on Home
  day: null,           // selected AD date 'YYYY-MM-DD'
  checks: {},          // materials checklist ticks
  deathDate: '',       // shraddha tithi finder input
  sh: { relation: 'father', name: '', gotra: '', me: '', title: 'sharma', month: 6, paksha: 'K', tithi: 1 }
};

let S = load();

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      return { ...DEFAULT_STATE, ...saved, sh: { ...DEFAULT_STATE.sh, ...(saved.sh || {}) } };
    }
  } catch (e) { /* storage blocked or corrupt: start fresh */ }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
}
