# pietroferraiuolo.github.io

Personal website of **Pietro Ferraiuolo** — astrophysics researcher & scientific software developer at INAF Osservatorio Astrofisico di Arcetri (Firenze).

Live at <https://pietroferraiuolo.github.io/>.

## Stack

Pure static site: hand-written HTML + CSS + a pinch of vanilla JavaScript.
No frameworks, no build step, no trackers. GitHub Pages serves it straight from this repo.

| Path | Purpose |
| --- | --- |
| `index.html` | Single-page site: About · Research · Publications · Software · Talks · Outreach · Contact |
| `assets/css/style.css` | Design tokens (dark/light themes), layout, components |
| `assets/js/main.js` | Theme toggle, mobile nav drawer, scroll-spy, reveal-on-scroll, email copy |
| `assets/fonts/` | Self-hosted Inter & Space Grotesk variable fonts (latin subsets, SIL OFL) |
| `images/` | Hero background (ESA/Hubble Ultra Deep Field, CC BY 4.0) + WebP variants, portrait, OG preview |
| `favicon.svg` | Segmented-mirror mark (PetalMirror / ELT-M4 motif) |
| `PFCV.pdf` | Full Curriculum Vitae — **keep this filename**, external profiles link to it |
| `Publication List.pdf` | Printable publication list |

## Local development

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Updating content

- **Publications**: edit the `<ol class="pubs">` in `index.html`. Each entry is an
  `<li class="pub">` (add `is-first` for first-author papers); long author lists
  collapse inside `<details><summary>all N authors</summary>…`.
- **Colours / fonts**: CSS custom properties at the top of `assets/css/style.css`
  (`:root` for dark, `html[data-theme='light']` for light).
- **CV**: replace `PFCV.pdf` with the new export, keeping the same filename.

## Credits

- Background: [ESA/Hubble — Ultra Deep Field (heic0611b)](https://esahubble.org/images/heic0611b/), CC BY 4.0
- Fonts: [Inter](https://rsms.me/inter/) & [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), SIL Open Font License
- Icons: [Lucide](https://lucide.dev/) (ISC) & [Simple Icons](https://simpleicons.org/) (CC0)
