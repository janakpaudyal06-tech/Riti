// Screen functions. Each returns an HTML string for #app.

function subTabs(key, tabs) {
  const cur = S.sub[key] || tabs[0][0];
  return `<div class="subtabs" role="tablist">${tabs.map(([id, label]) =>
    `<button role="tab" class="${cur === id ? 'on' : ''}" aria-selected="${cur === id}" data-sub="${key}:${id}">${label}</button>`).join('')}</div>`;
}
function curSub(key, def) { return S.sub[key] || def; }

function backBar(title) {
  return `<div class="backbar"><button class="back" data-go="" aria-label="${T('पछाडि', 'Back')}">‹ ${T('पछाडि', 'Back')}</button><h1>${title}</h1></div>`;
}

function mantraBlock(text) {
  if (!text) return '';
  const shown = S.roman ? roman(text) : text;
  return `<div class="mantra" ${S.roman ? 'lang="sa-Latn"' : 'lang="sa"'}>${esc(shown).replace(/\n/g, '<br>')}</div>
    <div class="mantra-tools">
      <button class="pill small" data-act="roman">${S.roman ? 'देवनागरी' : 'Roman'}</button>
      ${canSpeak() ? `<button class="pill small" data-speak="${esc(text)}">🔊 ${T('सुन्नुहोस्', 'Listen')}</button>` : ''}
    </div>`;
}

function stepView(key, steps) {
  const n = steps.length;
  let i = Math.min(S.step[key] || 0, n - 1);
  const s = steps[i];
  const mantra = typeof s.mantra === 'function' ? s.mantra() : s.mantra;
  return `<section class="card step">
    <div class="kicker">${T('चरण', 'Step')} ${num(i + 1)} / ${num(n)}</div>
    <h2>${esc(TO(s.title))}</h2>
    <p>${esc(TO(s.text))}</p>
    ${mantraBlock(mantra)}
    ${s.meaning ? `<p class="meaning"><b>${T('अर्थ', 'Meaning')}:</b> ${esc(TO(s.meaning))}</p>` : ''}
    <div class="stepnav">
      <button class="btn" data-step="${key}:${i - 1}" ${i === 0 ? 'disabled' : ''}>‹ ${T('अघिल्लो', 'Previous')}</button>
      <button class="btn primary" data-step="${key}:${i + 1}" ${i === n - 1 ? 'disabled' : ''}>${T('अर्को', 'Next')} ›</button>
    </div>
  </section>
  <section class="card"><h3>${T('सबै चरण', 'All steps')}</h3><ol class="steplist">${steps.map((st, j) =>
    `<li class="${j === i ? 'on' : ''}"><button class="link" data-step="${key}:${j}">${esc(TO(st.title))}</button></li>`).join('')}</ol></section>`;
}

function checklist(key, items) {
  const ticks = S.checks[key] || {};
  return `<section class="card"><ul class="checks">${items.map((it, j) =>
    `<li><label><input type="checkbox" data-check="${key}:${j}" ${ticks[j] ? 'checked' : ''}> <span>${esc(TO(it))}</span></label></li>`).join('')}</ul>
    <button class="link" data-act="clearChecks" data-key="${key}">${T('सबै हटाउनुहोस्', 'Clear ticks')}</button></section>`;
}

// ---------- Pujas tab ----------

function nextDashain() {
  const [y, m, d] = todayHere();
  const hits = findLunarDates(y, m, d, 400, (p, prev) => lunarMatch(p, 6, 1) && !(prev && lunarMatch(prev, 6, 1)));
  return hits[0];
}

function pujasScreen() {
  const nd = nextDashain();
  const ndText = nd ? `${T('घटस्थापना', 'Ghatasthapana')}: ${adToBs(...nd) ? bsDateText(adToBs(...nd)) + ' · ' : ''}${adDateText(...nd)}` : '';
  return `<h1 class="pagetitle">${T('पूजा', 'Pujas')}</h1>
    <button class="guide" data-go="daily">
      <span class="gicon">🪔</span><span><b>${T('दैनिक पूजा', 'Daily Puja')}</b>
      <span class="sub">${T('घरमा गर्ने नित्य पूजा — पूरा वा ५ मिनेटको', 'Everyday home puja — full or 5-minute')}</span></span></button>
    <button class="guide" data-go="navaratri">
      <span class="gicon">🔱</span><span><b>${T('नवरात्र पूजा (नवदुर्गा)', 'Navaratri Puja (Navadurga)')}</b>
      <span class="sub">${T('घटस्थापनादेखि दशमीको टीकासम्म', 'From Ghatasthapana to Dashami tika')}</span>
      ${ndText ? `<span class="sub accent">${ndText}</span>` : ''}</span></button>
    <h2 class="section">${T('अन्य पूजा', 'Other pujas')}</h2>
    <div class="guide soon"><span class="gicon">🪙</span><span><b>${T('लक्ष्मी पूजा (तिहार)', 'Laxmi Puja (Tihar)')}</b><span class="sub">${T('छिट्टै आउँदैछ', 'Coming soon')}</span></span></div>
    <div class="guide soon"><span class="gicon">🌼</span><span><b>${T('सत्यनारायण पूजा', 'Satyanarayan Puja')}</b><span class="sub">${T('छिट्टै आउँदैछ', 'Coming soon')}</span></span></div>`;
}

function dailyScreen() {
  const steps = S.puja === 'short' ? DAILY_STEPS.filter(s => s.short) : DAILY_STEPS;
  const sub = curSub('daily', 'steps');
  return `${backBar(T('दैनिक पूजा', 'Daily Puja'))}
    <div class="seg">
      <button class="${S.puja === 'full' ? 'on' : ''}" data-act="pujaFull">${T('पूरा पूजा', 'Full puja')}</button>
      <button class="${S.puja === 'short' ? 'on' : ''}" data-act="pujaShort">${T('५ मिनेटको पूजा', '5-minute puja')}</button>
    </div>
    ${subTabs('daily', [['steps', T('विधि', 'Steps')], ['materials', T('सामग्री', 'Materials')]])}
    ${sub === 'materials' ? checklist('daily', DAILY_MATERIALS) : stepView('daily-' + S.puja, steps)}`;
}

function navaratriScreen() {
  const sub = curSub('nava', 'steps');
  let body;
  if (sub === 'durga') body = navadurgaList();
  else if (sub === 'dates') body = navaDates();
  else if (sub === 'chandi') body = chandiView();
  else if (sub === 'materials') body = checklist('nava', NAVA_MATERIALS);
  else body = stepView('nava', NAVA_STEPS);
  return `${backBar(T('नवरात्र पूजा', 'Navaratri Puja'))}
    <p class="intro">${T('बडा दशैंका नौ रात (नवरात्र) मा दुर्गाका नौ रूप — नवदुर्गा — को पूजा गरिन्छ। घटस्थापनामा जमरा र कलश राखिन्छ र विजया दशमीमा टीका-जमरा लगाइन्छ।',
      'During the nine nights (Navaratri) of Bada Dashain, the nine forms of Durga — the Navadurga — are worshipped. Jamara and the kalash are set up on Ghatasthapana, and tika and jamara are received on Vijaya Dashami.')}</p>
    ${subTabs('nava', [['steps', T('विधि', 'Steps')], ['durga', T('नवदुर्गा', 'Nine Durgas')], ['chandi', T('चण्डी पाठ', 'Chandi Path')], ['dates', T('मिति', 'Dates')], ['materials', T('सामग्री', 'Materials')]])}
    ${body}`;
}

function navadurgaList() {
  const open = S.step.durga ?? 0;
  return `<section class="card"><p>${T('हरेक दिन त्यस दिनकी देवीको ध्यान गरी तलको श्लोक पढ्नुहोस्।', "Each day, meditate on that day's form and recite her verse.")}</p>
    ${mantraBlock(NAVADURGA_LIST_SHLOKA)}
    <p class="meaning">${T('यो श्लोक (देवी कवचबाट) ले नौ दुर्गाका नाम क्रमैसँग बताउँछ।', 'This verse (from the Devi Kavacham) names the nine Durgas in order.')}</p></section>
    ${NAVADURGA.map((g, j) => `<section class="card durga ${open === j ? 'open' : ''}">
      <button class="durgahead" data-durga="${j}" aria-expanded="${open === j}">
        <span class="daynum">${num(j + 1)}</span>
        <span><b>${esc(TO(g))}</b><span class="sub">${T(`दिन ${num(j + 1)}`, `Day ${j + 1}`)}${j === 6 ? ' · ' + T('फूलपाती', 'Phulpati') : j === 7 ? ' · ' + T('महाअष्टमी', 'Maha Ashtami') : j === 8 ? ' · ' + T('महानवमी', 'Maha Navami') : ''}</span></span>
      </button>
      ${open === j ? `<p>${esc(TO(g.about))}</p>${mantraBlock(g.mantra)}` : ''}
    </section>`).join('')}`;
}

// Day of Navaratri today (1-based), or 0 outside Navaratri.
function navaratriDayToday() {
  const [y, m, d] = todayHere();
  const start = addDays(y, m, d, -9);
  const hit = findLunarDates(...start, 10, (p, prev) => lunarMatch(p, 6, 1) && !(prev && lunarMatch(prev, 6, 1)))[0];
  if (!hit) return 0;
  const n = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(hit[0], hit[1] - 1, hit[2])) / DAY_MS) + 1;
  return n >= 1 && n <= 10 ? n : 0;
}

function chandiView() {
  const today = navaratriDayToday();
  const chapters = list => list.map(n => num(n)).join(', ');
  return `<section class="card">
    <h2>${T('दुर्गा सप्तशती (चण्डी पाठ)', 'Durga Saptashati (Chandi Path)')}</h2>
    <p>${T('मार्कण्डेय पुराणको देवी माहात्म्य — ७०० श्लोक, १३ अध्याय, तीन चरित्रमा। नवरात्रमा यसको पाठ गर्नु सबैभन्दा ठूलो देवी उपासना मानिन्छ।',
      'The Devi Mahatmya of the Markandeya Purana — 700 verses in 13 chapters, in three episodes. Reciting it during Navaratri is considered the foremost worship of the Goddess.')}</p>
    <p class="note">${T('पूरा पाठका लागि छापिएको दुर्गा सप्तशती पुस्तक (जस्तै गीता प्रेस) प्रयोग गर्नुहोस्। यहाँ पाठको क्रम, अध्यायको सार र सप्तश्लोकी दुर्गा छन्।',
      'For the full path, use a printed Durga Saptashati (for example the Gita Press edition). Here you have the order of the path, what each chapter tells, and the Saptashloki Durga.')}</p>
  </section>
  <section class="card"><h3>${T('पाठको क्रम', 'Order of the path')}</h3>
    <ol class="rules">${CHANDI_ORDER.map(o => `<li>${esc(TO(o))}</li>`).join('')}</ol></section>
  <section class="card"><h3>${T('सात दिनमा पाठ', 'Reading over seven days')}</h3>
    <p class="sub">${T('एकै दिन पूरा पाठ गर्न नसके परम्परागत रूपमा यसरी सात दिनमा बाँडिन्छ। नवरात्रको पहिलो दिनदेखि सुरु गर्नुहोस्।',
      'If you cannot read it all in one day, it is traditionally divided over seven days like this. Start on the first day of Navaratri.')}</p>
    <ul class="upcoming">${CHANDI_SEVEN_DAYS.map((list, i) =>
      `<li class="${today === i + 1 ? 'is-now' : ''}"><b>${T(`दिन ${num(i + 1)}`, `Day ${i + 1}`)}</b>${today === i + 1 ? ` <span class="fest">${T('आज', 'Today')}</span>` : ''}
        <span class="sub">${T('अध्याय', list.length > 1 ? 'Chapters' : 'Chapter')} ${chapters(list)}</span></li>`).join('')}</ul></section>
  <section class="card"><h3>${T('अध्याय र चरित्र', 'Chapters and episodes')}</h3>
    ${CHANDI_CHARITRAS.map(c => `<h4>${esc(TO(c))}</h4><ul class="chapters">${c.chapters.map(ch =>
      `<li><span class="daynum small">${num(ch.n)}</span><span>${esc(TO(ch))}</span></li>`).join('')}</ul>`).join('')}</section>
  <section class="card"><h3>${T('नियम', 'Rules')}</h3><ul class="rules">${CHANDI_RULES.map(r => `<li>${esc(TO(r))}</li>`).join('')}</ul></section>
  <section class="card"><h2>${T('सप्तश्लोकी दुर्गा', 'Saptashloki Durga')}</h2>
    <p class="sub">${T('सप्तशतीबाटै लिइएका सात श्लोक — छोटो चण्डी पाठका रूपमा पढिन्छ।', 'Seven verses taken from the Saptashati itself — recited as a short Chandi path.')}</p>
    ${SAPTASHLOKI.map((v, i) => `<div class="verse"><div class="kicker">${T('श्लोक', 'Verse')} ${num(i + 1)} · ${T('अध्याय', 'Chapter')} ${num(v.ch)}</div>
      ${mantraBlock(v.mantra)}<p class="meaning"><b>${T('अर्थ', 'Meaning')}:</b> ${esc(TO(v.meaning))}</p></div>`).join('')}
  </section>`;
}

function navaDates() {
  const nd = nextDashain();
  if (!nd) return `<section class="card"><p>${T('मिति भेटिएन।', 'Dates not found.')}</p></section>`;
  const days = [
    [0, T('घटस्थापना — नवरात्र सुरु', 'Ghatasthapana — Navaratri begins')],
    [6, T('फूलपाती', 'Phulpati')], [7, T('महाअष्टमी', 'Maha Ashtami')], [8, T('महानवमी', 'Maha Navami')],
    [9, T('विजया दशमी — टीका', 'Vijaya Dashami — tika')], [14, T('कोजाग्रत पूर्णिमा — दशैं सकिन्छ', 'Kojagrat Purnima — Dashain ends')]
  ];
  // Find each by tithi rather than counting days, so skipped/doubled tithis are handled.
  const rows = days.map(([k, label]) => {
    const hit = k === 0 ? nd : findLunarDates(...nd, 20, (p, prev) => lunarMatch(p, 6, k + 1) && !(prev && lunarMatch(prev, 6, k + 1)))[0];
    if (!hit) return '';
    const bs = adToBs(...hit);
    return `<li><b>${label}</b><span class="sub">${bs ? bsDateText(bs) + ' · ' : ''}${TO(WEEKDAYS[weekdayOf(...hit)])}, ${adDateText(...hit)}</span></li>`;
  }).join('');
  return `<section class="card"><div class="cityrow">${citySelect()}</div><ul class="upcoming">${rows}</ul>
    <p class="note">${T('मिति तपाईंको शहरको सूर्योदयको तिथिबाट निकालिएको हो। घटस्थापना र टीकाको साइत नेपालको पात्रो वा पुरोहितसँग हेर्नुहोस्।',
      "Dates use the tithi at sunrise in your city. For the exact Ghatasthapana and tika sait, check Nepal's patro or your priest.")}</p></section>`;
}

// ---------- Shraddha tab ----------

function shTarget(month, paksha, tithi) { return { month, t: paksha === 'S' ? tithi : tithi + 15 }; }

// Shraddha falls on the day whose afternoon (aparahna) has the tithi; if no afternoon
// has it in that month, the day it is current at sunrise.
function shraddhaDates(month, t, days) {
  const [y, m, d] = todayHere();
  const apar = findLunarDates(y, m, d, days, (p, prev) =>
    !p.aparahna.adhik && p.aparahna.month === month && p.aparahna.tithi === t &&
    !(prev && prev.aparahna.month === month && prev.aparahna.tithi === t));
  const rise = findLunarDates(y, m, d, days, (p, prev) => lunarMatch(p, month, t) && !(prev && lunarMatch(prev, month, t)));
  const near = (a, b) => Math.abs(Date.UTC(a[0], a[1] - 1, a[2]) - Date.UTC(b[0], b[1] - 1, b[2])) <= 2 * DAY_MS;
  const all = [...apar, ...rise.filter(r => !apar.some(a => near(a, r)))];
  return all.sort((a, b) => Date.UTC(a[0], a[1] - 1, a[2]) - Date.UTC(b[0], b[1] - 1, b[2]));
}

function dateRow(hit, label) {
  const bs = adToBs(...hit);
  return `<li>${label ? `<b>${label}</b>` : ''}<span class="${label ? 'sub' : ''}">${bs ? bsDateText(bs) + ' · ' : ''}${TO(WEEKDAYS[weekdayOf(...hit)])}, ${adDateText(...hit)}</span></li>`;
}

function shraddhaScreen() {
  const sub = curSub('sh', 'date');
  let body;
  if (sub === 'vidhi') body = `${shDetailsNote()}${stepView('sh', SH_STEPS)}`;
  else if (sub === 'materials') body = `${checklist('sh', SH_MATERIALS)}<section class="card"><h3>${T('नियम', 'Rules')}</h3><ul class="rules">${SH_RULES.map(r => `<li>${esc(TO(r))}</li>`).join('')}</ul></section>`;
  else body = shDateFinder();
  return `<h1 class="pagetitle">${T('श्राद्ध', 'Shraddha')}</h1>
    ${subTabs('sh', [['date', T('मिति र विवरण', 'Date & details')], ['vidhi', T('विधि', 'Vidhi')], ['materials', T('सामग्री र नियम', 'Materials & rules')]])}
    ${body}`;
}

function shDetailsNote() {
  const sh = S.sh;
  if (sh.name && sh.gotra) return '';
  return `<p class="note">${T('"मिति र विवरण" मा गोत्र र नाम भर्नुभयो भने मन्त्रमा आफैं आउँछ।', 'Fill in the gotra and names under "Date & details" and they appear in the mantras.')}</p>`;
}

function opt(v, label, cur) { return `<option value="${v}" ${String(v) === String(cur) ? 'selected' : ''}>${esc(label)}</option>`; }

function shDateFinder() {
  const sh = S.sh;
  const tithiOpts = Array.from({ length: 15 }, (_, i) => i + 1).map(n =>
    opt(n, n === 15 ? (sh.paksha === 'S' ? tithiName(15) : tithiName(30)) : tithiName(n), sh.tithi)).join('');
  const { month, t } = shTarget(sh.month, sh.paksha, sh.tithi);
  const hits = shraddhaDates(month, t, 400).slice(0, 2);
  // Sorha shraddha: same tithi in pitri paksha (Ashwin krishna); purnima → Bhadra purnima.
  const sorhaT = sh.paksha === 'S' && sh.tithi === 15 ? { month: 5, t: 15 } : { month: 6, t: (sh.tithi % 15 || 15) + 15 };
  const sorha = shraddhaDates(sorhaT.month, sorhaT.t, 400)[0];
  const rel = SH_RELATIONS[sh.relation] || SH_RELATIONS.father;
  return `<section class="card">
    <h2>${T('तिथि श्राद्धको मिति', 'When is the shraddha?')}</h2>
    <p class="sub">${T('दिवंगत हुनुभएको चान्द्र महिना, पक्ष र तिथि छान्नुहोस्।', 'Choose the lunar month, paksha and tithi on which they passed away.')}</p>
    <div class="form">
      <label>${T('महिना', 'Month')}<select data-field="sh.month">${LUNAR_MONTHS.map((mo, i) => opt(i, TO(mo), sh.month)).join('')}</select></label>
      <label>${T('पक्ष', 'Paksha')}<select data-field="sh.paksha">${opt('S', pakshaName('S'), sh.paksha)}${opt('K', pakshaName('K'), sh.paksha)}</select></label>
      <label>${T('तिथि', 'Tithi')}<select data-field="sh.tithi">${tithiOpts}</select></label>
    </div>
    <details class="finder" ${S.deathDate ? 'open' : ''}><summary>${T('तिथि थाहा छैन? मृत्युको मितिबाट पत्ता लगाउनुहोस्', "Don't know the tithi? Find it from the date of death")}</summary>
      <label>${T('मृत्युको मिति (AD)', 'Date of death (AD)')}<input type="date" data-field="deathDate" min="2021-04-14" max="2033-04-12" value="${esc(S.deathDate || '')}"></label>
      ${S.deathDate ? deathTithiInfo() : ''}
    </details>
    <div class="cityrow">${citySelect()}</div>
    <h3>${T('आउँदो वार्षिक श्राद्ध', 'Next annual shraddha')}</h3>
    <ul class="upcoming">${hits.map(h => dateRow(h)).join('') || `<li>${T('भेटिएन', 'Not found')}</li>`}</ul>
    ${sorha ? `<h3>${T('सोह्र श्राद्ध (पितृपक्ष)', 'Sorha Shraddha (Pitri Paksha)')}</h3><ul class="upcoming">${dateRow(sorha)}</ul>` : ''}
    <p class="note">${T('श्राद्ध अपराह्न (दिउँसो) मा जुन तिथि पर्छ, त्यसैका आधारमा मिति निकालिएको हो; अधिक मासमा वार्षिक श्राद्ध गरिँदैन। परिवार वा पुरोहितसँग एकपटक मिलाउनुहोस्।',
      'The date is the day whose afternoon (aparahna) has the tithi; annual shraddha is not done in an adhik month. Please confirm once with your family or priest.')}</p>
  </section>
  <section class="card">
    <h2>${T('विवरण', 'Details')}</h2>
    <p class="sub">${T('यी विवरण सङ्कल्प र तर्पणका मन्त्रमा आफैं भरिन्छन्। यो जानकारी तपाईंको फोनमा मात्र रहन्छ।', 'These fill in the sankalpa and tarpan mantras. They stay on your device only.')}</p>
    <div class="form">
      <label>${T('कसको श्राद्ध', 'Shraddha for')}<select data-field="sh.relation">${Object.entries(SH_RELATIONS).map(([k, r]) => opt(k, TO(r), sh.relation)).join('')}</select></label>
      <label>${T('उहाँको नाम', 'Their name')}<input data-field="sh.name" value="${esc(sh.name)}" placeholder="${T('जस्तै: रामप्रसाद', 'e.g. रामप्रसाद')}"></label>
      <label>${T('गोत्र', 'Gotra')}<input data-field="sh.gotra" value="${esc(sh.gotra)}" placeholder="${T('जस्तै: भारद्वाज', 'e.g. भारद्वाज')}"></label>
      <label>${T('तपाईंको (कर्ताको) नाम', 'Your name (performer)')}<input data-field="sh.me" value="${esc(sh.me)}" placeholder="${T('जस्तै: हरि', 'e.g. हरि')}"></label>
      <label>${T('थर अनुसार', 'Name ending')}<select data-field="sh.title">${Object.entries(SH_TITLES).map(([k, r]) => opt(k, TO(r), sh.title)).join('')}</select></label>
    </div>
    <p class="sub">${T('मन्त्रका लागि नाम र गोत्र देवनागरीमा लेख्नुहोस्।', 'Write names and gotra in Devanagari for the mantras.')}</p>
    <h3>${T('सङ्कल्प', 'Sankalpa')} — ${esc(TO(rel))}</h3>
    ${mantraBlock(shSankalpa())}
  </section>`;
}

function deathTithiInfo() {
  const [y, m, d] = parseIso(S.deathDate);
  const place = currentPlace();
  const p = panchangFor(y, m, d, place);
  const tith = p.tithi > 15 && p.tithi < 30 ? p.tithi - 15 : p.tithi === 30 ? 15 : p.tithi;
  return `<div class="deathinfo">
    <p>${T('त्यस दिन सूर्योदयमा', 'At sunrise that day')}: <b>${lunarLabel(p)}</b>${p.adhik ? ' — ' + T('अधिक मास: श्राद्ध सामान्यतया शुद्ध मासकै सोही तिथिमा गरिन्छ', 'adhik month: shraddha is usually done on the same tithi in the regular month') : ''}</p>
    <p class="sub">${T('यो तिथि सकिने', 'This tithi ends')}: ${clock(p.ends, place.tz)}${dateIn(p.ends, place.tz).join() !== [y, m, d].join() ? ' ' + T('(भोलि)', '(next day)', '(अगले दिन)') : ''}. ${T('मृत्यु त्यसपछि भएको भए अर्को तिथि लिनुहोस्।', 'If death was after this time, use the next tithi.')}</p>
    <button class="btn primary" data-act="useDeathTithi" data-m="${p.month}" data-p="${p.paksha}" data-t="${tith}">${T('यो तिथि प्रयोग गर्नुहोस्', 'Use this tithi')}</button>
  </div>`;
}

// ---------- Aarti tab ----------

function aartiScreen() {
  return `<h1 class="pagetitle">${T('आरती', 'Aarti')}</h1>
    ${AARTIS.map(a => `<button class="guide" data-aarti="${a.id}">
      <span class="gicon">${a.icon}</span><span><b>${esc(TO(a))}</b><span class="sub">${esc(TO(a.deity))}</span></span></button>`).join('')}
    <section class="card"><h3>${T('आरती कसरी गर्ने', 'How to do aarti')}</h3>
      <ol class="rules">${AARTI_HOWTO.map(h => `<li>${esc(TO(h))}</li>`).join('')}</ol></section>`;
}

// Lyrics are Hindi/Braj: shown as written, with the same Roman and read-aloud tools.
function lyricsBlock(text, cls) {
  const shown = S.roman ? roman(text) : text;
  return `<div class="lyrics ${cls || ''}" lang="${S.roman ? 'hi-Latn' : 'hi'}">${esc(shown).replace(/\n/g, '<br>')}</div>`;
}

function aartiView() {
  const a = AARTIS.find(x => x.id === S.sub.aarti) || AARTIS[0];
  const refrainFirst = a.refrain.split('\n')[0].replace(/[\s,।॥]+$/, '');
  const full = [a.refrain, ...a.stanzas.flatMap(s => [s, refrainFirst])].join('\n');
  return `${backBar(esc(TO(a)))}
    <p class="intro">${esc(TO(a.deity))}</p>
    <div class="mantra-tools">
      <button class="pill small" data-act="roman">${S.roman ? 'देवनागरी' : 'Roman'}</button>
      ${canSpeak() ? `<button class="pill small" data-speak="${esc(full)}">🔊 ${T('सुन्नुहोस्', 'Listen')}</button>` : ''}
    </div>
    <section class="card aarti">
      ${lyricsBlock(a.refrain, 'refrain')}
      ${a.stanzas.map(s => `${lyricsBlock(s)}${lyricsBlock(refrainFirst + ' …', 'echo')}`).join('')}
    </section>
    <section class="card"><h3>${TO(AARTI_CLOSING.title)}</h3>
      ${mantraBlock(AARTI_CLOSING.mantra)}
      <p class="meaning"><b>${T('अर्थ', 'Meaning')}:</b> ${esc(TO(AARTI_CLOSING.meaning))}</p></section>
    <p class="note">${T('यी आरती धेरै घरमा गाइने प्रचलित पाठ हुन्; कतिपय परिवारमा केही पङ्क्ति अलि फरक गाइन्छन्।',
      'These are the versions most commonly sung; some families sing a few lines differently.')}</p>
    ${aartiNav(a)}`;
}

function aartiNav(a) {
  const i = AARTIS.indexOf(a);
  const prev = AARTIS[i - 1], next = AARTIS[i + 1];
  return `<div class="stepnav">
    <button class="btn" ${prev ? `data-aarti="${prev.id}"` : 'disabled'}>‹ ${prev ? esc(TO(prev)) : ''}</button>
    <button class="btn" ${next ? `data-aarti="${next.id}"` : 'disabled'}>${next ? esc(TO(next)) : ''} ›</button>
  </div>`;
}
