// Home: today's tithi card, BS month calendar with tithi for each day, upcoming festivals.

function todayHere() { return dateIn(Date.now(), currentPlace().tz); }

function bsDateText(bs) {
  return `${num(bs.d)} ${TO(BS_MONTHS[bs.m - 1])} ${num(bs.y)}`;
}
function adDateText(y, m, d) {
  if (S.lang === 'en') return `${d} ${AD_MONTHS_EN[m - 1]} ${y}`;
  return `${num(d)} ${(S.lang === 'hi' ? AD_MONTHS_HI : AD_MONTHS_NE)[m - 1]} ${num(y)}`;
}
function weekdayOf(y, m, d) { return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); }

// "Ashwin Krishna Chaturdashi" style label.
function lunarLabel(p) {
  const month = TO(LUNAR_MONTHS[p.month]) + (p.adhik ? ' ' + T('(अधिक)', '(adhik)', '(अधिक)') : '');
  return `${month} ${pakshaShort(p.paksha)} ${tithiName(p.tithi)}`;
}
// Compact tithi for a calendar cell.
function tithiShort(p) {
  if (p.tithi === 15) return T('पूर्णिमा', 'Purnima', 'पूर्णिमा');
  if (p.tithi === 30) return T('औंसी', 'Aunsi', 'अमावस');
  const n = p.tithi > 15 ? p.tithi - 15 : p.tithi;
  return (p.paksha === 'S' ? T('शु', 'S', 'शु') : T('कृ', 'K', 'कृ')) + ' ' + num(n);
}

function citySelect() {
  return `<label class="city">📍 <select data-field="city" aria-label="${T('शहर', 'City')}">${PLACES.map(p =>
    `<option value="${p.id}" ${p.id === S.city ? 'selected' : ''}>${esc(TO(p))}</option>`).join('')}</select></label>`;
}

function festList(fests) {
  return fests.map(f => `<span class="fest ${f.minor ? 'minor' : ''} ${f.dashain ? 'dashain' : ''}">${esc(TO(f))}</span>`).join(' ');
}

// Card with full detail for one AD date.
function dayCard(y, m, d, heading) {
  const place = currentPlace();
  const { p, fests, bs } = dayInfo(y, m, d);
  const wd = TO(WEEKDAYS[weekdayOf(y, m, d)]);
  return `<section class="card today">
    ${heading ? `<div class="kicker">${heading}</div>` : ''}
    <div class="bigdate">${bs ? bsDateText(bs) : ''}</div>
    <div class="sub">${wd} · ${adDateText(y, m, d)}</div>
    <div class="tithi">${lunarLabel(p)}</div>
    <div class="sub">${T('तिथि सकिने', 'Tithi ends', 'तिथि समाप्ति')}: ${clock(p.ends, place.tz)}${
      dateIn(p.ends, place.tz).join() !== [y, m, d].join() ? ' ' + T('(भोलि)', '(next day)', '(अगले दिन)') : ''}</div>
    <div class="sun">🌅 ${clock(p.rise, place.tz)} &nbsp; 🌇 ${clock(p.set, place.tz)} &nbsp; <span class="muted">${esc(TO(place))}</span></div>
    ${fests.length ? `<div class="fests">${festList(fests)}</div>` : ''}
  </section>`;
}

function calendarGrid() {
  const [ty, tm, td] = todayHere();
  const todayBs = adToBs(ty, tm, td);
  if (!S.cal || !bsInRange(S.cal.y)) S.cal = todayBs ? { y: todayBs.y, m: todayBs.m } : { y: 2083, m: 1 };
  const { y, m } = S.cal;
  const len = bsMonthLength(y, m);
  const [fy, fm, fd] = bsToAd(y, m, 1);
  const lead = weekdayOf(fy, fm, fd);
  const todayIso = isoDate(ty, tm, td);
  let cells = '';
  for (let i = 0; i < lead; i++) cells += '<div class="cell empty"></div>';
  for (let d = 1; d <= len; d++) {
    const [ay, am, ad] = addDays(fy, fm, fd, d - 1);
    const iso = isoDate(ay, am, ad);
    const { p, fests } = dayInfo(ay, am, ad);
    const major = fests.filter(f => !f.minor);
    const cls = ['cell', iso === todayIso ? 'is-today' : '', iso === S.day ? 'is-sel' : '',
      weekdayOf(ay, am, ad) === 6 ? 'sat' : '', major.length ? 'has-fest' : '',
      p.tithi === 15 || p.tithi === 30 ? 'moon' : ''].join(' ');
    cells += `<button class="${cls}" data-day="${iso}" aria-label="${esc(bsDateText({ y, m, d }))}">
      <span class="bsd">${num(d)}</span><span class="add">${S.lang === 'en' ? ad : num(ad)}</span>
      <span class="ti">${tithiShort(p)}</span>${major.length ? `<span class="fe">${esc(TO(major[0]))}</span>` : ''}</button>`;
  }
  const [ly, lm, ld] = bsToAd(y, m, len);
  const adNames = S.lang === 'en' ? AD_MONTHS_EN : S.lang === 'hi' ? AD_MONTHS_HI : AD_MONTHS_NE;
  const adSpan = `${adNames[fm - 1]}${fy !== ly ? ' ' + num(fy) : ''} – ${adNames[lm - 1]} ${num(ly)}`;
  const prevOk = bsInRange(m === 1 ? y - 1 : y), nextOk = bsInRange(m === 12 ? y + 1 : y);
  return `<section class="card cal">
    <div class="calhead">
      <button class="nav" data-act="prevMonth" ${prevOk ? '' : 'disabled'} aria-label="${T('अघिल्लो महिना', 'Previous month')}">‹</button>
      <div><div class="mname">${TO(BS_MONTHS[m - 1])} ${num(y)}</div><div class="sub">${adSpan}</div></div>
      <button class="nav" data-act="nextMonth" ${nextOk ? '' : 'disabled'} aria-label="${T('अर्को महिना', 'Next month')}">›</button>
    </div>
    <div class="grid wk">${WEEKDAYS_SHORT.map(w => `<div>${TO(w)}</div>`).join('')}</div>
    <div class="grid">${cells}</div>
    <div class="row"><button class="link" data-act="thisMonth">${T('आजको महिना', 'This month')}</button></div>
    ${y >= BS_PROVISIONAL_FROM ? `<p class="note">${T('यो वर्षको महिनाको दिन सङ्ख्या अस्थायी हो; नेपाल सरकारको आधिकारिक पात्रो प्रकाशित भएपछि मिलाइनेछ।',
      "This year's month lengths are provisional until Nepal's official calendar is published.")}</p>` : ''}
  </section>`;
}

function upcomingFestivals(days) {
  const [y, m, d] = todayHere();
  const out = [];
  for (let i = 1; i <= days && out.length < 5; i++) {
    const [ay, am, ad] = addDays(y, m, d, i);
    const { fests, bs } = dayInfo(ay, am, ad);
    for (const f of fests) if (!f.minor) out.push({ f, ay, am, ad, bs, i });
  }
  if (!out.length) return '';
  return `<section class="card"><h2>${T('आउँदै गरेका पर्व', 'Coming up')}</h2><ul class="upcoming">${out.slice(0, 5).map(o =>
    `<li><button class="link" data-day="${isoDate(o.ay, o.am, o.ad)}"><b>${esc(TO(o.f))}</b></button>
      <span class="sub">${o.bs ? bsDateText(o.bs) : ''} · ${adDateText(o.ay, o.am, o.ad)} · ${
        T(`${num(o.i)} दिनपछि`, `in ${o.i} day${o.i > 1 ? 's' : ''}`, `${num(o.i)} दिन बाद`)}</span></li>`).join('')}</ul></section>`;
}

function homeScreen() {
  const [y, m, d] = todayHere();
  let sel = '';
  if (S.day && S.day !== isoDate(y, m, d)) {
    const [sy, sm, sd] = parseIso(S.day);
    sel = dayCard(sy, sm, sd, T('छानिएको दिन', 'Selected day'));
  }
  return `<div class="cityrow">${citySelect()}</div>
    ${dayCard(y, m, d, T('आज', 'Today'))}
    ${sel}
    ${calendarGrid()}
    ${upcomingFestivals(60)}
    <p class="note">${T('तिथि तपाईंको शहरको सूर्योदयमा गणना गरिएको हो, त्यसैले नेपालको पात्रोसँग कहिलेकाहीँ एक दिन फरक पर्न सक्छ। पर्वको दिन र साइतका लागि स्थानीय पुरोहित वा आधिकारिक पात्रो पनि हेर्नुहोस्।',
      'Tithi is calculated at sunrise in your city, so it can occasionally differ by a day from the Nepal patro. For festival days and sait, also check with your priest or the official patro.')}</p>`;
}
