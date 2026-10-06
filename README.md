# aryaans-portfolio

Personal portfolio for Aryaan Habib: a homepage and four case studies (Sentinel, NBA Auction Fantasy, Arena, Adventure of the Ages). React 18 and Vite, no other runtime dependencies, no tracking.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve dist/ at http://localhost:4173
```

## Checks

```bash
npm run check:copy                 # no em dashes, no excluded projects, no stock phrases
npm run preview & npm run check:links   # every route and asset returns 200; lists external URLs
```

## Where things live

- `src/content/site.js`: hero proof strip, principles, experience, archive
- `src/content/projects.js`: the four case studies
- `src/components/Diagrams.jsx`: architecture diagrams, drawn from each project's source
- `public/media/`: game screenshots (from the team repo) and the Arena replay plot (generated from `demo/showcase.arep`)
- `docs/CLAIM_LEDGER.md`: every factual claim, its source, and whether it was verified

## Resume link

The header has a Resume link that stays hidden until it's set. Put a current PDF in `public/` and set `RESUME_URL` in `src/components/Layout.jsx`.

## Publishing (Netlify)

Build command `npm run build`, publish directory `dist`. `public/_redirects` sends every path to `index.html` so `/work/...` URLs work on refresh.
