// Rendering and the delegated event loop.

const PALETTES = ['saffron', 'maroon', 'forest', 'indigo'];
const TABS = [
  ['home', '📅', () => T('पात्रो', 'Calendar', 'पंचांग')],
  ['pujas', '🪔', () => T('पूजा', 'Pujas')],
  ['shraddha', '🕯️', () => T('श्राद्ध', 'Shraddha')]
];
const VIEWS = { daily: dailyScreen, navaratri: navaratriScreen };

function render() {
  const root = document.documentElement;
  root.lang = S.lang === 'en' ? 'en' : S.lang;
  root.style.setProperty('--fs', S.fs + 'px');
  root.dataset.palette = PALETTES[S.palette % PALETTES.length];

  let html;
  if (S.view && VIEWS[S.view]) html = VIEWS[S.view]();
  else if (S.tab === 'pujas') html = pujasScreen();
  else if (S.tab === 'shraddha') html = shraddhaScreen();
  else html = homeScreen();
  document.getElementById('app').innerHTML = html;

  document.getElementById('tabs').innerHTML = TABS.map(([id, icon, label]) =>
    `<button data-tab="${id}" class="${S.tab === id ? 'on' : ''}" aria-current="${S.tab === id ? 'page' : 'false'}">
      <span class="ticon" aria-hidden="true">${icon}</span><span>${label()}</span></button>`).join('');
  document.getElementById('langSel').value = S.lang;
  document.title = T('रीति · पूजा, श्राद्ध र पात्रो', 'Riti · Puja, Shraddha and Calendar', 'रीति · पूजा, श्राद्ध और पंचांग');
}

function go(fn, keepScroll) {
  fn();
  save();
  render();
  if (!keepScroll) window.scrollTo(0, 0);
}

document.addEventListener('click', e => {
  const el = e.target.closest('button, [data-day]');
  if (!el) return;
  const ds = el.dataset;

  if (ds.tab) return go(() => { S.tab = ds.tab; S.view = null; stopSpeaking(); });
  if ('go' in ds) return go(() => { S.view = ds.go || null; stopSpeaking(); });
  if (ds.sub) {
    const [key, id] = ds.sub.split(':');
    return go(() => { S.sub[key] = id; }, true);
  }
  if (ds.step) {
    const [key, i] = ds.step.split(':');
    return go(() => { S.step[key] = Math.max(0, +i); stopSpeaking(); });
  }
  if (ds.durga) return go(() => { S.step.durga = S.step.durga === +ds.durga ? -1 : +ds.durga; }, true);
  if (ds.day) return go(() => { S.day = ds.day; const bs = adToBs(...parseIso(ds.day)); if (bs) S.cal = { y: bs.y, m: bs.m }; });
  if (ds.speak) return speak(ds.speak);

  switch (ds.act) {
    case 'prevMonth': return go(() => { S.cal = S.cal.m === 1 ? { y: S.cal.y - 1, m: 12 } : { y: S.cal.y, m: S.cal.m - 1 }; }, true);
    case 'nextMonth': return go(() => { S.cal = S.cal.m === 12 ? { y: S.cal.y + 1, m: 1 } : { y: S.cal.y, m: S.cal.m + 1 }; }, true);
    case 'thisMonth': return go(() => { S.cal = null; S.day = null; }, true);
    case 'roman': return go(() => { S.roman = !S.roman; }, true);
    case 'pujaFull': return go(() => { S.puja = 'full'; }, true);
    case 'pujaShort': return go(() => { S.puja = 'short'; }, true);
    case 'clearChecks': return go(() => { S.checks[ds.key] = {}; }, true);
    case 'useDeathTithi': return go(() => { S.sh.month = +ds.m; S.sh.paksha = ds.p; S.sh.tithi = +ds.t; }, true);
  }
});

document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.check) {
    const [key, j] = el.dataset.check.split(':');
    S.checks[key] = { ...(S.checks[key] || {}), [j]: el.checked };
    return save();
  }
  const f = el.dataset.field;
  if (!f) return;
  go(() => {
    if (f === 'city') S.city = el.value;
    else if (f === 'deathDate') S.deathDate = el.value;
    else if (f.startsWith('sh.')) {
      const k = f.slice(3);
      S.sh[k] = ['month', 'tithi'].includes(k) ? +el.value : el.value.trim();
    }
  }, true);
});

document.getElementById('homeBtn').addEventListener('click', () => go(() => { S.tab = 'home'; S.view = null; S.day = null; S.cal = null; }));
document.getElementById('paletteBtn').addEventListener('click', () => go(() => { S.palette = (S.palette + 1) % PALETTES.length; }, true));
document.getElementById('fsUp').addEventListener('click', () => go(() => { S.fs = Math.min(28, S.fs + 2); }, true));
document.getElementById('fsDown').addEventListener('click', () => go(() => { S.fs = Math.max(14, S.fs - 2); }, true));
document.getElementById('langSel').addEventListener('change', e => go(() => { S.lang = e.target.value; }, true));

render();
