// Bikram Sambat ↔ AD conversion.
// Month lengths follow Nepal's published calendar (as compiled in the
// nepali-date-converter project). BS 2083 is checked against the official patro;
// 2084 onwards is provisional until Nepal's calendar for those years is published.

const BS_FIRST_YEAR = 2078;
const BS_START_AD = Date.UTC(2021, 3, 14); // 1 Baisakh 2078
const BS_PROVISIONAL_FROM = 2084;
const BS_MONTH_DAYS = {
  2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2084: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2085: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2086: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2087: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
  2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2090: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]
};
const BS_LAST_YEAR = 2090;

function bsInRange(y) { return y >= BS_FIRST_YEAR && y <= BS_LAST_YEAR; }

// AD (y, m 1–12, d) → { y, m (1–12), d } in BS, or null if out of range.
function adToBs(y, m, d) {
  let days = Math.round((Date.UTC(y, m - 1, d) - BS_START_AD) / DAY_MS);
  if (days < 0) return null;
  for (let by = BS_FIRST_YEAR; by <= BS_LAST_YEAR; by++) {
    for (let bm = 0; bm < 12; bm++) {
      const len = BS_MONTH_DAYS[by][bm];
      if (days < len) return { y: by, m: bm + 1, d: days + 1 };
      days -= len;
    }
  }
  return null;
}

// BS → [y, m, d] in AD.
function bsToAd(by, bm, bd) {
  let days = 0;
  for (let y = BS_FIRST_YEAR; y < by; y++) days += BS_MONTH_DAYS[y].reduce((a, b) => a + b, 0);
  for (let m = 1; m < bm; m++) days += BS_MONTH_DAYS[by][m - 1];
  days += bd - 1;
  const t = new Date(BS_START_AD + days * DAY_MS);
  return [t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()];
}

function bsMonthLength(by, bm) { return BS_MONTH_DAYS[by][bm - 1]; }
