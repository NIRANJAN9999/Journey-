# Your site

Three files do all the work: `index.html` (content), `styles.css` (design), `script.js` (scroll progress bar + reveal animations). No build step, no dependencies — ready to host as-is.

## Put it on GitHub Pages

1. Create a repo on GitHub (`yourusername.github.io` for a root domain, or any other name).
2. Upload `index.html`, `styles.css`, `script.js`, and the `assets` folder to the repo root.
3. Repo Settings → Pages → set Source to the `main` branch, root folder.
4. Your site goes live at `https://yourusername.github.io/` (or `/repo-name/` if you used a different repo name).

## Before you publish — do these first

**1. Your name.** I didn't put a name on the page because I don't know yours — you never mentioned it. Search the files for `Your Name` and replace every instance:
   - `index.html`: the `<title>`, the two `og:` meta tags, the `hero-byline` line near the top of the page, and the footer at the bottom.

**2. Contact links.** In `index.html`, in the `contact-links` block near the bottom: swap in your real email and GitHub / LinkedIn / Instagram URLs.

**3. Double-check two things I carried over from earlier in our conversation** rather than from your own story, so I can't personally vouch for the exact wording:
   - The **self-hosted multi-agent AI system** card ("six coordinated AI agent roles, tracked on a kanban board") — adjust if that's not quite accurate.
   - **"Based in Hyderabad, India"** in the hero — remove or change if that's not right.

**4. Photos.** Every `<div class="media-placeholder" data-label="...">` is a spot for a real image. Replace it with:
   ```html
   <img src="assets/your-photo.jpg" alt="Description of the photo">
   ```
   Drop photos into the `assets` folder first. See `assets/PHOTO_GUIDE.txt` for the specific list of what each spot is asking for, and suggested aspect ratios.

**5. Project links.** The "View writeup ↗" links in the Work section point to `#` for now. Point them at GitHub repos, Instagram posts, or a short write-up page once you have one — or delete the link if there's nothing to point to yet.

**6. Open Graph image.** `assets/og-cover.jpg` is referenced for link previews on LinkedIn and elsewhere. Add a 1200×630px image there, or delete the `<meta property="og:image">` line to skip it for now.

**7. Read the copy.** Everything is built from what you told me, kept in your own voice as much as possible — but read it end to end and change anything that doesn't sound like you.

## If you want to change the look

Colors, fonts, and spacing are set as variables at the top of `styles.css`:

```css
--bg: #FFFFFF;        /* page background */
--accent: #2F5C4D;    /* the one accent color — a patina copper-green, a nod to the copper wire in the motor story */
--text: #1B1B18;      /* primary text */
```

Change these and the whole site updates — nothing else needs touching.
