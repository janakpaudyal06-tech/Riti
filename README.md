# रीति · Riti

A Nepali rituals guide for Nepalis living abroad. Step-by-step vidhi with mantras, meanings and materials, plus a tithi calendar calculated for your own city.

The app works in Nepali, Hindi and English, runs entirely in the browser, and keeps each person's details on their own device only.

## What's in it

The app has four tabs:

- **Calendar (पात्रो)**, the home screen: today's Bikram Sambat and AD date, tithi at sunrise in your city with its end time, sunrise and sunset, a month calendar with the tithi on every day, festivals, and what's coming up
- **Pujas**: Daily Puja (full or 5-minute) and Navaratri Puja (Ghatasthapana, the nine Navadurga, Chandi Path (order, 7-day plan, Saptashloki Durga) with their dhyana shlokas, Phulpati, Ashtami/Navami, Dashami tika, and this year's dates). Laxmi Puja and Satyanarayan Puja are listed as coming soon
- **Aarti**: Om Jai Jagdish Hare, Jai Ganesh Deva, Jai Ambe Gauri, Om Jai Lakshmi Mata, Om Jai Shiv Omkara and Aarti Kije Hanuman Lala Ki, with how to do aarti and Karpuragauram to close
- **Shraddha**: annual tithi shraddha date finder (the afternoon/aparahna rule), Sorha Shraddha date, finding the tithi from a date of death, a step-by-step vidhi whose sankalpa and tarpan fill in the gotra and names, and a materials list with rules

Mantras can be shown in Roman letters and read aloud.

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
js/core/                state and storage, helpers (T(), transliteration), read-aloud
js/data/vocabulary.js   month, tithi, paksha and weekday names
js/i18n/hi.js           Hindi translations, keyed by the Nepali text
js/calendar/            panchang engine, Bikram Sambat, cities and festivals, Home screen
js/guides/              content: Daily Puja, Navaratri, Shraddha, Aarti
js/app/                 screen rendering and the main event loop
```

## Disclaimer

These are general methods. Family tradition and a priest's guidance may differ, and the app says so to its users.
