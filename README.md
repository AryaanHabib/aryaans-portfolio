# The Playbook

Aryaan Habib's portfolio, drawn as a coach's whiteboard. Five projects, each one runnable on the page.

- `index.html` holds the whole site: markup, styles, scripts, the Arena match recording with a JavaScript port of the server's simulation, and the Face Value player and shot data.
- `media/` holds the Adventure of the Ages screenshots.
- GSAP, ScrollTrigger and Lenis load from jsDelivr, and fonts from Google Fonts. The page still works without them.

## Deploy

Netlify reads `netlify.toml`: `npm run build` copies the site into `dist/`, which is published. No dependencies to install.

To preview locally, open `index.html`, or run `npm run build && npm run preview`.
