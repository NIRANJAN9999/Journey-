# Your site

Three files do all the work: `index.html` (content), `styles.css` (design), `script.js` (scroll progress bar + reveal animations). No build step, no dependencies — ready to host as-is.

## Put it on GitHub Pages

1. Create a repo on GitHub (`yourusername.github.io` for a root domain, or any other name).
2. Upload `index.html`, `styles.css`, `script.js`, and the `assets` folder to the repo root.
3. Repo Settings → Pages → set Source to the `main` branch, root folder.
4. Your site goes live at `https://yourusername.github.io/` (or `/repo-name/` if you used a different repo name).

## What changed in this pass

- **Background** — off pure white, onto a warm stone/putty tone with a very faint paper-grain texture, easier on the eyes and less flat than plain white.
- **Your name** — set in the hero, sized and weighted like an actual name now instead of a small label.
- **Self-hosting removed** — the "self-hosted multi-agent AI system" mentions (hero, Now section, and its own Work card) are gone, since you flagged that wasn't accurate. The "Exploring" node graph was also updated to drop "AI agents & automation" and "Self-hosted infra," replaced with "Mechanical design & CAD" and "Software fundamentals," which match the rest of your story instead.
- **Small hand-drawn touches** — a slowly-turning gear line-drawing behind the hero text (nod to the mechanical diploma years), a soft glow on each timeline marker (nod to the LED/light projects), a small gear icon by the mechanical-engineering entry, a small spark icon on the "Full circle" moment, and a gentle pulse on the lines in the node graph. All are subtle and all respect a visitor's reduced-motion setting — if someone's system is set to reduce motion, everything just holds still.
- **A sample code block** — added under the home automation project, styled like a small code panel. It's placeholder code, clearly marked as a sample in both the label and an inline comment. Swap it for a real snippet from your project, or delete it — it's wrapped in an HTML comment in `index.html` telling you exactly what to remove.
- **Two more photo slots** — the "first real build" (cycle light) and "screens, then code" journey entries now have a placeholder too, in case you want photos there.
- **Fixed a couple of small things** — the email link was missing `mailto:` so it wouldn't have opened a mail app; that's fixed. The footer name didn't match the one in the hero, so I made them consistent — change it if "Micheal" was actually what you wanted there.

## Before you publish

1. **Photos.** Every `<div class="media-placeholder" data-label="...">` is a spot for a real image:
   ```html
   <img src="assets/your-photo.jpg" alt="Description of the photo">
   ```
   Drop photos into the `assets` folder first. See `assets/PHOTO_GUIDE.txt` for what each spot is asking for.
2. **Project links.** The "View writeup ↗" links point to `#` for now — point them at real repos or posts, or delete the ones with nothing behind them yet.
3. **The code block.** Either replace the sample snippet with something real, or delete it — see the comment around it in `index.html`.
4. **Open Graph image.** `assets/og-cover.jpg` is referenced for link previews on LinkedIn etc. Add a 1200×630px image there, or delete the `<meta property="og:image">` line to skip it.
5. **Read the copy once more.** It's built from what you told me, in your voice as much as I could keep it — check nothing reads off.

## If you want to change the look

Colors, fonts, and spacing are set as variables at the top of `styles.css`:

```css
--bg: #F2EEE4;        /* page background — warm stone, not stark white */
--accent: #2F5C4D;    /* the one accent color — a patina copper-green, a nod to the copper wire in the motor story */
--text: #26221B;      /* primary text */
```

Change these and the whole site updates — nothing else needs touching. The gear/glow/pulse animations are all in `styles.css` too, each wrapped in a comment saying what it does, so they're easy to find and delete individually if you decide you don't want one.
