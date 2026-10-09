// Small shared helpers: translation, escaping, numbers, transliteration.

// T(nepali, english[, hindi]) — Hindi falls back to the HI map, then to Nepali.
function T(ne, en, hi) {
  if (S.lang === 'en') return en ?? ne;
  if (S.lang === 'hi') return hi ?? ((typeof HI !== 'undefined' && HI[ne]) || ne);
  return ne;
}
// For content objects shaped { ne, en, hi }.
function TO(o) { return o == null ? '' : typeof o === 'string' ? o : T(o.ne, o.en, o.hi); }

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const DEV_DIGITS = '०१२३४५६७८९';
function num(n) {
  const s = String(n);
  return S.lang === 'en' ? s : s.replace(/[0-9]/g, d => DEV_DIGITS[d]);
}

function pad2(n) { return String(n).padStart(2, '0'); }
function isoDate(y, m, d) { return `${y}-${pad2(m)}-${pad2(d)}`; }
function parseIso(s) { return s.split('-').map(Number); }

// Devanagari → IAST, for the Roman toggle on mantras.
const TR_VOWELS = { 'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū', 'ऋ': 'ṛ', 'ॠ': 'ṝ',
  'ऌ': 'ḷ', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au' };
const TR_MATRAS = { 'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au' };
const TR_CONS = { 'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ', 'च': 'c', 'छ': 'ch', 'ज': 'j',
  'झ': 'jh', 'ञ': 'ñ', 'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ', 'त': 't', 'थ': 'th',
  'द': 'd', 'ध': 'dh', 'न': 'n', 'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y',
  'र': 'r', 'ल': 'l', 'ळ': 'ḷ', 'व': 'v', 'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h' };
const TR_OTHER = { 'ं': 'ṃ', 'ः': 'ḥ', 'ँ': 'm̐', 'ऽ': "'", '।': '|', '॥': '||', 'ॐ': 'oṃ' };

function roman(text) {
  let out = '';
  const chars = [...text];
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (TR_CONS[c]) {
      out += TR_CONS[c];
      const n = chars[i + 1];
      if (n === '्') { i++; continue; }
      if (TR_MATRAS[n]) { out += TR_MATRAS[n]; i++; continue; }
      out += 'a';
    } else if (TR_VOWELS[c]) out += TR_VOWELS[c];
    else if (TR_OTHER[c]) out += TR_OTHER[c];
    else if (DEV_DIGITS.includes(c)) out += DEV_DIGITS.indexOf(c);
    else out += c;
  }
  return out;
}

// Time of day in a place's timezone, e.g. "06:12".
function clock(ms, tz) {
  try {
    return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz })
      .format(new Date(ms)).replace(/[0-9]/g, d => S.lang === 'en' ? d : DEV_DIGITS[d]);
  } catch (e) { return ''; }
}
// Local calendar date of an instant in a timezone → [y, m, d].
function dateIn(ms, tz) {
  try {
    const p = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: tz })
      .format(new Date(ms));
    return parseIso(p);
  } catch (e) {
    const t = new Date(ms);
    return [t.getFullYear(), t.getMonth() + 1, t.getDate()];
  }
}
