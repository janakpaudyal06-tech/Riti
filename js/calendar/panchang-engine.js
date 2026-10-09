// Astronomical panchang: sun and moon positions, sunrise, tithi and lunar month.
// Moon: Meeus "Astronomical Algorithms" ch. 47 (main periodic terms, ~0.01° accuracy).
// Sun: Meeus ch. 25 (low precision, ~0.01°). Good to about a minute for tithi end times.
// All instants are JavaScript millisecond timestamps (UTC).

const DAY_MS = 86400000;
const RAD = Math.PI / 180;
const DELTA_T_S = 69; // TT − UT in seconds, close enough for 2020–2040

function norm360(x) { x %= 360; return x < 0 ? x + 360 : x; }
function julianCenturiesTT(ms) {
  const jd = ms / DAY_MS + 2440587.5 + DELTA_T_S / 86400;
  return (jd - 2451545.0) / 36525;
}

function sunLongitude(ms) {
  const T = julianCenturiesTT(ms);
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * RAD;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M)
    + (0.019993 - 0.000101 * T) * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M);
  const omega = (125.04 - 1934.136 * T) * RAD;
  return norm360(L0 + C - 0.00569 - 0.00478 * Math.sin(omega));
}

// [D, M, M', F, coefficient × 1e-6 degrees]
const MOON_TERMS = [
  [0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],[0,1,0,0,-185116],
  [0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],[2,0,1,0,53322],[2,-1,0,0,45758],
  [0,1,-1,0,-40923],[1,0,0,0,-34720],[0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,2,-12528],
  [0,0,1,-2,10980],[4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],
  [2,1,0,0,-6766],[1,0,-1,0,-5163],[1,1,0,0,4987],[2,-1,1,0,4036],[2,0,2,0,3994],
  [4,0,0,0,3861],[2,0,-3,0,3665],[0,1,-2,0,-2689],[2,0,-1,2,-2602],[2,-1,-2,0,2390],
  [1,0,1,0,-2348],[2,-2,0,0,2236],[0,1,2,0,-2120],[0,2,0,0,-2069],[2,-2,-1,0,2048],
  [2,0,1,-2,-1773],[2,0,0,2,-1595],[4,-1,-1,0,1215],[0,0,2,2,-1110],[3,0,-1,0,-892],
  [2,1,1,0,-810],[4,-1,-2,0,759],[0,2,-1,0,-713],[2,2,-1,0,-700],[2,1,-2,0,691],
  [2,-1,0,-2,596],[4,0,1,0,549],[0,0,4,0,537],[4,-1,0,0,520],[1,0,-2,0,-487]
];

function moonLongitude(ms) {
  const T = julianCenturiesTT(ms), T2 = T * T, T3 = T2 * T, T4 = T3 * T;
  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000;
  const D = (297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000) * RAD;
  const M = (357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000) * RAD;
  const Mp = (134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699 - T4 / 14712000) * RAD;
  const F = (93.2720950 + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000) * RAD;
  const E = 1 - 0.002516 * T - 0.0000074 * T2;
  let sum = 0;
  for (const [d, m, mp, f, c] of MOON_TERMS) {
    const e = Math.abs(m) === 1 ? E : Math.abs(m) === 2 ? E * E : 1;
    sum += c * e * Math.sin(d * D + m * M + mp * Mp + f * F);
  }
  const A1 = (119.75 + 131.849 * T) * RAD, A2 = (53.09 + 479264.290 * T) * RAD;
  sum += 3958 * Math.sin(A1) + 1962 * Math.sin(Lp * RAD - F) + 318 * Math.sin(A2);
  return norm360(Lp + sum / 1e6);
}

// Moon − Sun, 0..360. Each tithi is 12° of this.
function elongation(ms) { return norm360(moonLongitude(ms) - sunLongitude(ms)); }

// Lahiri (Chitrapaksha) ayanamsa, linear approximation.
function ayanamsa(ms) {
  const years = (ms - Date.UTC(2000, 0, 1, 12)) / (365.25 * DAY_MS);
  return 23.853 + years * (50.29 / 3600);
}
function siderealSun(ms) { return norm360(sunLongitude(ms) - ayanamsa(ms)); }

// Tithi number 1..30 (1–15 shukla, 16–30 krishna; 15 purnima, 30 aunsi) at an instant.
function tithiAt(ms) { return Math.floor(elongation(ms) / 12) + 1; }

// Find the instant (near guess) when the elongation reaches target degrees.
function elongationCrossing(target, guess) {
  let t = guess;
  for (let i = 0; i < 30; i++) {
    let diff = norm360(target - elongation(t));
    if (diff > 180) diff -= 360;
    if (Math.abs(diff) < 1e-6) break;
    t += diff / 12.19 * DAY_MS; // moon gains ~12.19° a day on the sun
  }
  return t;
}

// When does the tithi in force at ms end?
function tithiEnd(ms) {
  const n = tithiAt(ms);
  const target = (n * 12) % 360;
  const left = norm360(target - elongation(ms));
  return elongationCrossing(target, ms + left / 12.19 * DAY_MS);
}

const SYNODIC = 29.530588853;
function newMoonBefore(ms) {
  const e = elongation(ms);
  return elongationCrossing(0, ms - e / 360 * SYNODIC * DAY_MS);
}

// Amanta lunar month for the lunation containing ms.
// Index 0 = Chaitra … 11 = Phalguna, named after the rashi the sun enters during it.
// adhik = the sun stays in one rashi for the whole lunation.
const _lunationCache = new Map();
function lunationOf(ms) {
  let nm1 = newMoonBefore(ms);
  if (nm1 > ms) nm1 = newMoonBefore(ms - 2 * DAY_MS);
  const key = Math.round(nm1 / 3600000);
  if (_lunationCache.has(key)) return _lunationCache.get(key);
  const nm2 = elongationCrossing(0, nm1 + SYNODIC * DAY_MS);
  const s1 = Math.floor(siderealSun(nm1) / 30), s2 = Math.floor(siderealSun(nm2) / 30);
  const res = { start: nm1, end: nm2, month: (s1 + 1) % 12, adhik: s1 === s2 };
  _lunationCache.set(key, res);
  return res;
}

// Full lunar info for an instant, with purnimanta naming as used in Nepali patros:
// the krishna paksha carries the name of the following amanta month.
function lunarInfo(ms) {
  const tithi = tithiAt(ms);
  const lun = lunationOf(ms);
  let month = lun.month, adhik = lun.adhik;
  if (tithi > 15) {
    const next = lunationOf(lun.end + 2 * DAY_MS);
    month = next.month; adhik = next.adhik;
  }
  return { tithi, paksha: tithi <= 15 ? 'S' : 'K', month, adhik };
}

// Sunrise and sunset (UTC ms) for a local calendar date at lat/lon (degrees, east positive).
// Uses the standard −0.833° altitude. Returns null times inside polar day/night.
function sunTimes(y, m, d, lat, lon) {
  const noonGuess = Date.UTC(y, m - 1, d, 12) - lon / 15 * 3600000;
  const at = t => {
    const T = julianCenturiesTT(t);
    const lam = sunLongitude(t) * RAD;
    const eps = (23.439291 - 0.0130042 * T) * RAD;
    const dec = Math.asin(Math.sin(eps) * Math.sin(lam));
    const ra = norm360(Math.atan2(Math.cos(eps) * Math.sin(lam), Math.cos(lam)) / RAD);
    const L0 = norm360(280.46646 + 36000.76983 * T);
    let eot = L0 - 0.0057183 - ra; // degrees
    eot = ((eot + 180) % 360 + 360) % 360 - 180;
    return { dec, eot };
  };
  const event = sign => {
    let t = noonGuess;
    for (let i = 0; i < 3; i++) {
      const { dec, eot } = at(t);
      const transit = Date.UTC(y, m - 1, d, 12) - (lon + eot) / 15 * 3600000;
      const cosH = (Math.sin(-0.833 * RAD) - Math.sin(lat * RAD) * Math.sin(dec)) /
        (Math.cos(lat * RAD) * Math.cos(dec));
      if (cosH < -1 || cosH > 1) return null;
      t = transit + sign * Math.acos(cosH) / RAD / 15 * 3600000;
    }
    return t;
  };
  const rise = event(-1), set = event(1);
  return {
    rise: rise ?? Date.UTC(y, m - 1, d, 6) - lon / 15 * 3600000,
    set: set ?? Date.UTC(y, m - 1, d, 18) - lon / 15 * 3600000
  };
}

// Panchang for a local date at a place: tithi at sunrise, when it ends, lunar month.
const _dayCache = new Map();
function panchangFor(y, m, d, place) {
  const key = `${y}-${m}-${d}@${place.lat},${place.lon}`;
  if (_dayCache.has(key)) return _dayCache.get(key);
  const { rise, set } = sunTimes(y, m, d, place.lat, place.lon);
  const info = lunarInfo(rise);
  const ends = tithiEnd(rise);
  const nextRise = sunTimes(...addDays(y, m, d, 1), place.lat, place.lon).rise;
  // Aparahna: the 4th of five equal parts of daytime — the time shraddha follows.
  const aparahnaMid = rise + (set - rise) * 0.7;
  const res = {
    ...info, rise, set, ends,
    kshaya: tithiEnd(ends + 60000) < nextRise, // the next tithi starts and ends before next sunrise
    aparahna: lunarInfo(aparahnaMid),
    nightTithi: tithiAt(set + (nextRise - set) / 2)
  };
  _dayCache.set(key, res);
  return res;
}

function addDays(y, m, d, n) {
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return [t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()];
}
