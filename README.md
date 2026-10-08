# रीति · Riti

A Nepali rituals guide for Nepalis living abroad. Step-by-step vidhi with mantras, meanings and materials, plus a tithi calendar calculated for your own city.

The app works in Nepali, Hindi and English, runs entirely in the browser, and keeps each person's details on their own device only.

## What's in it

- **Tithi Shraddha**: 20-step vidhi, mantras that fill in names and gotra automatically, materials checklist, rules
- **Daily Puja**: full or 5-minute version
- **Aarti and bhajan** book with read-aloud
- **Vrata**: fasting days with background
- **Nwaran**: naming ceremony, with a birth-letter (nakshatra) finder
- **Tithi calendar (पात्रो)**: Bikram Sambat and AD, tithi at local sunrise, festivals, shraddha date finder
- **Shubha sait**: published auspicious days for BS 2083

Planned: Festivals guide, and more sanskars (Pasni, Bratabandha, Bibaha). See [ROADMAP.md](ROADMAP.md).

## Run it locally

There is no build step. Open a terminal in this folder and start any static server:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. (Opening `index.html` directly by double-clicking also works in most browsers.)

## Publish with GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Project layout

```
index.html              page shell; loads the CSS and scripts in order
css/styles.css          all styles, light/dark themes, colour palettes
js/core/                storage, helpers, read-aloud audio
js/data/                shared ritual vocabulary (titles, months, tithis, weekdays)
js/i18n/hi.js           Hindi translations, keyed by the Nepali text
js/guides/              Shraddha, Daily Puja, Nwaran, name finder, Aarti, Vrata
js/calendar/            panchang engine, Bikram Sambat, places, festivals, calendar screens
js/sait/                auspicious-day data and screens
js/app/                 screen rendering and the main event loop
```

## Disclaimer

These are general methods. Family tradition and a priest's guidance may differ, and the app says so to its users.
