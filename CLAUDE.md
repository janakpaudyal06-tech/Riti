# Notes for Claude (and other contributors)

## What this is
Riti is a static web app: plain HTML, CSS and JavaScript, no framework, no bundler, no npm dependencies. Users are Nepali Hindus living abroad, often elders on phones, so clarity and large readable text matter more than flashy features.

## How the code is wired
- `index.html` loads every file in `js/` with ordinary `<script>` tags. **Order matters**: later files use constants and functions declared in earlier ones (they share one global scope). When you add a file, add its `<script>` tag in the right place.
- Do not convert files to ES modules (`import`/`export`) unless you convert all of them together; mixing breaks the shared globals.
- `S` (in `js/core/storage.js`) is the app state. `save()` writes it to `localStorage`; every storage call is wrapped in try/catch and the app must still work when storage is empty.
- `render()` in `js/app/main.js` redraws `#app` from state. Click handling is delegated through `data-go`, `data-tab`, `data-step` and similar attributes.
- A new guide = a content file in `js/guides/`, a screen function in `js/app/screens.js`, a home-screen entry, and a `data-go` route in `main.js`.

## Languages
- All user-facing text goes through `T(nepali, english[, hindi])`.
- Hindi falls back to the `HI` map in `js/i18n/hi.js`, keyed by the exact Nepali string. If you change Nepali text, update or add its `HI` entry too, or Hindi will show the old/Nepali text.
- Mantras stay in Sanskrit (Devanagari); the Roman toggle transliterates them automatically.

## Content accuracy
- Ritual steps, mantras and meanings should follow standard Nepali (Parbatiya Brahmin/Chhetri) practice, with notes where communities differ. Don't invent mantras.
- Calendar: tithi is computed astronomically at local sunrise (`js/calendar/panchang-engine.js`). BS month lengths and BS 2083 festivals/sait come from Nepal's official calendar; 2084+ are provisional. Keep those caveats visible to users.

## Checking your work
1. `python3 -m http.server 8000` and open http://localhost:8000.
2. Click through every guide and tab in all three languages, check the browser console for errors, and test at phone width (~390px) and in dark mode.
3. `node --check js/**/*.js` catches syntax errors quickly.
