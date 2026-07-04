# COREconf — Prague 2026

Website for **COREconf #0**, an open, non-profit conference on mesh
technologies, resilient communication, and the people who build it.

> Open mesh technologies. Real hardware. Human networks.

Built with **Svelte 5** (runes) + **Tailwind CSS v4** + **Vite**.

## Develop

```bash
npm install
npm run dev      # http://localhost:5175
npm run build    # static output in dist/
npm run preview
```

## Content

- **Site copy, dates, links** — [`src/lib/content.js`](src/lib/content.js)
- **Speakers** — [`src/lib/speakers.yaml`](src/lib/speakers.yaml)

## Deploy

Pushes to `main` deploy automatically to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## License

MIT — see [LICENSE](LICENSE). Fork it, run your own edition.
