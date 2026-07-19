# Your site

Three files: `index.html` (content and structure), `styles.css` (design), `script.js` (progress bar, scroll-reveal, animated timeline fill, parallax, and the floating "now" button). No build step, no dependencies.

## Put it on GitHub Pages

1. Create a repo on GitHub (`yourusername.github.io` for a root domain, or any other name).
2. Upload `index.html`, `styles.css`, `script.js`, and the `assets` folder to the repo root.
3. Settings → Pages → Source → `main` branch, root folder.
4. Live at `https://yourusername.github.io/` (or `/repo-name/` for a non-root repo).

## Things to personalize before you publish

- **Contact links** — bottom of `index.html`, in `contact-links`: swap in your real email, GitHub, LinkedIn, Instagram URLs.
- **Photos** — every `<div class="media-placeholder" data-label="...">` is a marked spot. Replace with:
  `<img src="assets/your-photo.jpg" alt="Description of the photo">`
  Journey photos are 4:3, work section photos are 16:10. Drop files into `assets` first.
- **Open Graph image** — `assets/og-cover.jpg` controls the preview when you share the link on LinkedIn. Add a 1200×630px image there, or remove the `<meta property="og:image">` line in `<head>` if you'd rather skip it.
- **Copy** — the story text is a first draft built from what you told me. Read it over and adjust anything that doesn't sound like you.
- **The floating button** — jumps to the section with `id="now"`. If you rename or move that section, update the `href="#now"` on the button too.

## If you want to change the look

Everything is a variable at the top of `styles.css`:

```css
--bg: #FAFAF7;      /* page background */
--accent: #2C3E6B;   /* the one accent color -- used sparingly on purpose */
--ink: #17181A;      /* primary text */
--dark: #14151A;     /* the one dark "intertitle" section background */
```

Change these and the whole site updates.

## A note on the effects

Parallax and scroll-reveal animations are automatically turned off for anyone with "reduce motion" enabled in their system settings -- that's intentional, not a bug if you notice it behaves differently on your own machine with that setting on.
