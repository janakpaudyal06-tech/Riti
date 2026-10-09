// Cities for local sunrise, and festivals computed from tithi or BS date.

const PLACES = [
  { id: 'kathmandu', ne: 'काठमाडौं', en: 'Kathmandu', hi: 'काठमांडू', lat: 27.7172, lon: 85.324, tz: 'Asia/Kathmandu' },
  { id: 'pokhara', ne: 'पोखरा', en: 'Pokhara', hi: 'पोखरा', lat: 28.2096, lon: 83.9856, tz: 'Asia/Kathmandu' },
  { id: 'biratnagar', ne: 'विराटनगर', en: 'Biratnagar', hi: 'विराटनगर', lat: 26.4525, lon: 87.2718, tz: 'Asia/Kathmandu' },
  { id: 'delhi', ne: 'दिल्ली', en: 'Delhi', hi: 'दिल्ली', lat: 28.6139, lon: 77.209, tz: 'Asia/Kolkata' },
  { id: 'bengaluru', ne: 'बेङ्गलुरु', en: 'Bengaluru', hi: 'बेंगलुरु', lat: 12.9716, lon: 77.5946, tz: 'Asia/Kolkata' },
  { id: 'doha', ne: 'दोहा', en: 'Doha', hi: 'दोहा', lat: 25.2854, lon: 51.531, tz: 'Asia/Qatar' },
  { id: 'dubai', ne: 'दुबई', en: 'Dubai', hi: 'दुबई', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai' },
  { id: 'riyadh', ne: 'रियाद', en: 'Riyadh', hi: 'रियाद', lat: 24.7136, lon: 46.6753, tz: 'Asia/Riyadh' },
  { id: 'kualalumpur', ne: 'क्वालालम्पुर', en: 'Kuala Lumpur', hi: 'कुआलालंपुर', lat: 3.139, lon: 101.6869, tz: 'Asia/Kuala_Lumpur' },
  { id: 'hongkong', ne: 'हङकङ', en: 'Hong Kong', hi: 'हांगकांग', lat: 22.3193, lon: 114.1694, tz: 'Asia/Hong_Kong' },
  { id: 'seoul', ne: 'सोल', en: 'Seoul', hi: 'सियोल', lat: 37.5665, lon: 126.978, tz: 'Asia/Seoul' },
  { id: 'tokyo', ne: 'टोकियो', en: 'Tokyo', hi: 'टोक्यो', lat: 35.6762, lon: 139.6503, tz: 'Asia/Tokyo' },
  { id: 'sydney', ne: 'सिड्नी', en: 'Sydney', hi: 'सिडनी', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney' },
  { id: 'melbourne', ne: 'मेलबर्न', en: 'Melbourne', hi: 'मेलबर्न', lat: -37.8136, lon: 144.9631, tz: 'Australia/Melbourne' },
  { id: 'perth', ne: 'पर्थ', en: 'Perth', hi: 'पर्थ', lat: -31.9505, lon: 115.8605, tz: 'Australia/Perth' },
  { id: 'auckland', ne: 'अकल्यान्ड', en: 'Auckland', hi: 'ऑकलैंड', lat: -36.8485, lon: 174.7633, tz: 'Pacific/Auckland' },
  { id: 'london', ne: 'लन्डन', en: 'London', hi: 'लंदन', lat: 51.5074, lon: -0.1278, tz: 'Europe/London' },
  { id: 'lisbon', ne: 'लिस्बन', en: 'Lisbon', hi: 'लिस्बन', lat: 38.7223, lon: -9.1393, tz: 'Europe/Lisbon' },
  { id: 'brussels', ne: 'ब्रसेल्स', en: 'Brussels', hi: 'ब्रसेल्स', lat: 50.8503, lon: 4.3517, tz: 'Europe/Brussels' },
  { id: 'newyork', ne: 'न्युयोर्क', en: 'New York', hi: 'न्यूयॉर्क', lat: 40.7128, lon: -74.006, tz: 'America/New_York' },
  { id: 'washington', ne: 'वासिङ्टन डिसी', en: 'Washington DC', hi: 'वॉशिंगटन डीसी', lat: 38.9072, lon: -77.0369, tz: 'America/New_York' },
  { id: 'dallas', ne: 'डलास', en: 'Dallas', hi: 'डलास', lat: 32.7767, lon: -96.797, tz: 'America/Chicago' },
  { id: 'denver', ne: 'डेन्भर', en: 'Denver', hi: 'डेनवर', lat: 39.7392, lon: -104.9903, tz: 'America/Denver' },
  { id: 'sanfrancisco', ne: 'सान फ्रान्सिस्को', en: 'San Francisco', hi: 'सैन फ्रांसिस्को', lat: 37.7749, lon: -122.4194, tz: 'America/Los_Angeles' },
  { id: 'toronto', ne: 'टोरन्टो', en: 'Toronto', hi: 'टोरंटो', lat: 43.6532, lon: -79.3832, tz: 'America/Toronto' },
  { id: 'calgary', ne: 'क्यालगरी', en: 'Calgary', hi: 'कैलगरी', lat: 51.0447, lon: -114.0719, tz: 'America/Edmonton' }
];

function currentPlace() { return PLACES.find(p => p.id === S.city) || PLACES[0]; }

// Lunar festivals use purnimanta month names (index 0 = Chaitra) and tithi 1–30.
// rule 'night': tithi in force at local midnight (Shivaratri); default is tithi at sunrise.
// Solar festivals are fixed BS dates.
const FESTIVALS = [
  { bs: [1, 1], ne: 'नयाँ वर्ष', en: 'Nepali New Year', hi: 'नेपाली नववर्ष' },
  { lunar: [1, 15], ne: 'बुद्ध जयन्ती', en: 'Buddha Jayanti', hi: 'बुद्ध पूर्णिमा' },
  { lunar: [1, 30], ne: 'माता तीर्थ औंसी', en: "Mata Tirtha Aunsi (Mother's Day)", hi: 'माता तीर्थ औंसी (मातृ दिवस)' },
  { lunar: [3, 11], ne: 'हरिशयनी एकादशी', en: 'Harishayani Ekadashi', hi: 'देवशयनी एकादशी' },
  { bs: [4, 1], ne: 'साउने संक्रान्ति', en: 'Saune Sankranti', hi: 'साउने संक्रांति' },
  { lunar: [4, 5], ne: 'नाग पञ्चमी', en: 'Nag Panchami', hi: 'नाग पंचमी' },
  { lunar: [4, 15], ne: 'जनै पूर्णिमा', en: 'Janai Purnima', hi: 'जनेऊ पूर्णिमा / रक्षाबंधन' },
  { lunar: [5, 16], ne: 'गाईजात्रा', en: 'Gai Jatra', hi: 'गाईजात्रा' },
  { lunar: [5, 23], ne: 'श्रीकृष्ण जन्माष्टमी', en: 'Krishna Janmashtami', hi: 'श्रीकृष्ण जन्माष्टमी' },
  { lunar: [5, 30], ne: 'कुशे औंसी (बुबाको मुख हेर्ने दिन)', en: "Kushe Aunsi (Father's Day)", hi: 'कुशे औंसी (पितृ दिवस)' },
  { lunar: [5, 3], ne: 'हरितालिका तीज', en: 'Haritalika Teej', hi: 'हरितालिका तीज' },
  { lunar: [5, 5], ne: 'ऋषि पञ्चमी', en: 'Rishi Panchami', hi: 'ऋषि पंचमी' },
  { lunar: [5, 15], ne: 'सोह्र श्राद्ध सुरु (पूर्णिमा श्राद्ध)', en: 'Sorha Shraddha begins (Purnima shraddha)', hi: 'पितृ पक्ष आरम्भ (पूर्णिमा श्राद्ध)', shraddha: true },
  { lunar: [6, 30], ne: 'सोह्र श्राद्ध समाप्त (पितृ औंसी)', en: 'Sorha Shraddha ends (Pitri Aunsi)', hi: 'सर्वपितृ अमावस्या', shraddha: true },
  { lunar: [6, 1], ne: 'घटस्थापना', en: 'Ghatasthapana (Dashain begins)', hi: 'घटस्थापना (नवरात्रि आरम्भ)', dashain: true },
  { lunar: [6, 7], ne: 'फूलपाती', en: 'Phulpati', hi: 'फूलपाती (सप्तमी)', dashain: true },
  { lunar: [6, 8], ne: 'महाअष्टमी', en: 'Maha Ashtami', hi: 'महाअष्टमी', dashain: true },
  { lunar: [6, 9], ne: 'महानवमी', en: 'Maha Navami', hi: 'महानवमी', dashain: true },
  { lunar: [6, 10], ne: 'विजया दशमी (टीका)', en: 'Vijaya Dashami (Tika)', hi: 'विजयादशमी (टीका)', dashain: true },
  { lunar: [6, 15], ne: 'कोजाग्रत पूर्णिमा', en: 'Kojagrat Purnima', hi: 'कोजागरी पूर्णिमा', dashain: true },
  { lunar: [7, 28], ne: 'काग तिहार (धनतेरस)', en: 'Kag Tihar (Dhanteras)', hi: 'काग तिहार (धनतेरस)' },
  { lunar: [7, 29], ne: 'कुकुर तिहार', en: 'Kukur Tihar', hi: 'कुकुर तिहार (नरक चतुर्दशी)' },
  { lunar: [7, 30], ne: 'लक्ष्मी पूजा (गाई तिहार)', en: 'Laxmi Puja (Gai Tihar)', hi: 'लक्ष्मी पूजा (दीपावली)' },
  { lunar: [7, 1], ne: 'गोवर्धन पूजा / म्ह पूजा', en: 'Govardhan Puja / Mha Puja', hi: 'गोवर्धन पूजा' },
  { lunar: [7, 2], ne: 'भाइटीका', en: 'Bhai Tika', hi: 'भाई टीका (भैया दूज)' },
  { lunar: [7, 11], ne: 'हरिबोधिनी एकादशी', en: 'Haribodhini Ekadashi', hi: 'देवउठनी एकादशी' },
  { bs: [10, 1], ne: 'माघे संक्रान्ति', en: 'Maghe Sankranti', hi: 'माघे संक्रांति (मकर संक्रांति)' },
  { lunar: [10, 5], ne: 'श्री पञ्चमी (सरस्वती पूजा)', en: 'Shree Panchami (Saraswati Puja)', hi: 'वसंत पंचमी (सरस्वती पूजा)' },
  { lunar: [11, 29], rule: 'night', ne: 'महाशिवरात्रि', en: 'Maha Shivaratri', hi: 'महाशिवरात्रि' },
  { lunar: [11, 15], ne: 'फागु पूर्णिमा (होली)', en: 'Fagu Purnima (Holi)', hi: 'होली' },
  { lunar: [0, 8], ne: 'चैते दशैं', en: 'Chaite Dashain', hi: 'चैत्र दुर्गाष्टमी' },
  { lunar: [0, 9], ne: 'राम नवमी', en: 'Ram Navami', hi: 'राम नवमी' }
];

function tithiAfter(n) { return n === 30 ? 1 : n + 1; }

// Does the lunar target [month, tithi] fall on this day?
// Covers a skipped (kshaya) tithi by giving it to the day it begins and ends on.
function lunarMatch(p, month, tithi, rule) {
  if (p.adhik) return false;
  const t = rule === 'night' ? p.nightTithi : p.tithi;
  if (p.month !== month) return false;
  return t === tithi || (rule !== 'night' && p.kshaya && tithiAfter(p.tithi) === tithi);
}

// Festivals on a local AD date at a place. p = panchangFor(...) for that date.
function festivalsOn(y, m, d, p, prevP) {
  const out = [];
  const bs = adToBs(y, m, d);
  for (const f of FESTIVALS) {
    if (f.bs) {
      if (bs && bs.m === f.bs[0] && bs.d === f.bs[1]) out.push(f);
    } else if (lunarMatch(p, f.lunar[0], f.lunar[1], f.rule)) {
      // Vriddhi (same tithi at two sunrises): the festival is on the first day.
      if (prevP && !f.rule && lunarMatch(prevP, f.lunar[0], f.lunar[1])) continue;
      out.push(f);
    }
  }
  if (!out.some(f => /Ekadashi/.test(f.en)) && (p.tithi === 11 || p.tithi === 26) && !p.adhik &&
      !(prevP && prevP.tithi === p.tithi)) {
    out.push({ ne: 'एकादशी व्रत', en: 'Ekadashi fast', hi: 'एकादशी व्रत', minor: true });
  }
  return out;
}

// Panchang + festivals for a date, using the chosen city.
function dayInfo(y, m, d) {
  const place = currentPlace();
  const p = panchangFor(y, m, d, place);
  const prevP = panchangFor(...addDays(y, m, d, -1), place);
  return { p, fests: festivalsOn(y, m, d, p, prevP), bs: adToBs(y, m, d) };
}

// Next dates (from AD date) on which a lunar month/tithi falls, using a chooser per day.
function findLunarDates(fromY, fromM, fromD, maxDays, test) {
  const res = [];
  const place = currentPlace();
  let prev = panchangFor(...addDays(fromY, fromM, fromD, -1), place);
  for (let i = 0; i < maxDays; i++) {
    const [y, m, d] = addDays(fromY, fromM, fromD, i);
    const p = panchangFor(y, m, d, place);
    if (test(p, prev)) res.push([y, m, d]);
    prev = p;
  }
  return res;
}
