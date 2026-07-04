# COREconf — Prague 2026

Website for **COREconf #0**, an open, non-profit conference on mesh
technologies, resilient communication, and the people who build it.

> Open mesh technologies. Real hardware. Human networks.

Built with **Svelte 5** (runes) + **Tailwind CSS v4** + **Vite**.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5175
pnpm build      # static output in dist/
pnpm preview
```

## Content

All copy (dates, program, speakers, sponsors, links) lives in one place:
[`src/lib/content.js`](src/lib/content.js). Edit there — the components read
from it, so you never have to touch markup for a schedule change.

## The backdrop image

The hero uses `/static/hero.jpg` and falls back to a themed placeholder
(`/static/hero.svg`) if that file is missing.

**To use your exact artwork:** drop it in as `static/hero.jpg` (or `.png` and
update the path in [`Hero.svelte`](src/lib/components/Hero.svelte)). It's laid
out `object-cover object-right`, with a left-to-right dark gradient so the
headline stays readable over any image.

## Type

The **CORE** wordmark uses [Kanit](https://fonts.google.com/specimen/Kanit)
at 800 italic with a slight skew and tightened tracking, to echo the heavy,
condensed, slanted MESHCORE logo. Body/UI text is
[Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk). The lockup
lives in [`Wordmark.svelte`](src/lib/components/Wordmark.svelte) and the mark in
[`Mark.svelte`](src/lib/components/Mark.svelte).

## License

MIT — see [LICENSE](LICENSE). Fork it, run your own edition.
