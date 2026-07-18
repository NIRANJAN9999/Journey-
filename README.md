# Your site

Three files do all the work: `index.html` (content and structure), `styles.css` (the design), `script.js` (scroll progress bar + reveal animations). No build step, no dependencies — it's ready to host as-is.

## Put it on GitHub Pages

1. Create a repo on GitHub (either `yourusername.github.io` for a root domain, or any other name).
2. Upload `index.html`, `styles.css`, `script.js`, and the `assets` folder to the repo root.
3. Go to the repo's Settings → Pages → set Source to the `main` branch, root folder.
4. Your site goes live at `https://yourusername.github.io/` (or `/repo-name/` if you used a different repo name).

## Things to personalize before you publish

- **Contact links** — near the bottom of `index.html`, in the `contact-links` block: swap the email address and the GitHub/LinkedIn/Instagram URLs for your real ones.
- **Photos** — each project and journey milestone has a `<div class="media-placeholder" data-label="...">`. Replace it with a real image:
  `<img src="assets/your-photo.jpg" alt="Description of the photo">`
  Drop your photos into the `assets` folder first. Aim for consistent aspect ratios — the journey photos are 4:3, the work section photos are 16:10.
- **Project links** — the "View writeup" links in the work section currently point to `#`. Point them at your GitHub repos, Instagram posts, or a longer write-up page once you have one.
- **Open Graph image** — `assets/og-cover.jpg` is referenced in the `<head>` for link previews on LinkedIn and elsewhere. Add an image there (1200×630px works well) or remove that `<meta property="og:image">` line if you'd rather skip it for now.
- **Copy** — all the section text (the journey milestones, the "right now" card, the direction and scope statements) is a first draft based on what I know of your projects. Read it over and make it sound like you.

## If you want to change the look

Colors, fonts, and spacing are all defined as variables at the top of `styles.css`:

```css
--bg: #0E1626;        /* page background */
--accent: #C9A24B;     /* the one accent color, used sparingly on purpose */
--text: #EDEEE9;       /* primary text */
```

Change these and the whole site updates — nothing else needs touching.
