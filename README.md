# Franklin Fu — Portfolio

A clean, responsive personal portfolio site for Franklin Fu (UW ECE '28). Static HTML/CSS/JS — no build step, no framework.

## Live sections

- **Hero** — name, tagline, CTA, and an auto-rotating portrait slideshow
- **About** — short bio in a natural voice, plus at-a-glance education / focus / location
- **Experience** — timeline of roles (Husky Robotics, Zhejiang U, UW Solar, Dilipow, Craft², FTC)
- **Projects** — featured HaptiNav card with poster, plus drone firmware, laser marking, LLM benchmark, vibrotactile nav, and a featured FTC memory gallery
- **Skills** — programming, embedded, mechanical, AI/research, languages
- **Outside the Lab** — personal photo gallery: rock climbing, bouldering, hiking, around Seattle
- **Contact** — email, GitHub, LinkedIn, phone

## File structure

```
portfolio/
├── index.html                       # All page content
├── styles.css                       # All styling (mobile-first, with reveal animations)
├── script.js                        # Smooth-scroll, active-nav highlight, scroll reveal
├── HapNav_Poster.jpg                # Compressed poster used on featured HaptiNav project (504 KB)
├── stm32_drone_boards.jpg           # Photo on Husky Robotics drone firmware card (143 KB)
├── ep_tube_marker.jpg               # Photo on automated laser marking card (204 KB)
├── hero/                            # Hero portrait slideshow images (3 photos, 4:5 cropped)
│   ├── photo-1.jpg                  # Lab work (primary)
│   ├── photo-2.jpg                  # Bouldering on top of a boulder
│   └── photo-3.jpg                  # Outdoor top-rope climbing
├── life-gallery/                    # "Outside the Lab" personal gallery (4 photos)
│   └── photo-1.jpg … photo-4.jpg
├── ftc-gallery/                     # FTC photo gallery (drop photo-1.jpg … photo-6.jpg here)
│   ├── photo-1.jpg … photo-5.jpg
│   └── README.md                    # Naming/captions instructions
├── Franklin Fu's Resume Mar 2026.docx
├── Franklin_Fu_Resume_May_2026.docx.md
└── README.md
```

## Local preview

The site is fully static. Pick any of:

```bash
# Python
python -m http.server 8000

# Node (if you have npx)
npx serve .
```

Then open <http://localhost:8000>.

## Updating content

### Add or edit a project

Find the **Projects** section in `index.html` and copy a `<article class="project-card">…</article>` block. To make a project featured (full width with a poster), add the `featured` class:

```html
<article class="project-card featured">
    <div class="project-header">
        <h3>Project name</h3>
        <p class="project-subtitle">Short tech subtitle</p>
    </div>
    <div class="project-poster">
        <img class="poster-image" src="poster.jpg" alt="..." loading="lazy">
        <span class="poster-label">Caption</span>
    </div>
    <p class="project-description">…</p>
    <div class="project-tech">
        <span class="tech-badge">Tech</span>
    </div>
    <div class="project-meta">
        <span class="meta-item">Date range</span>
        <span class="meta-item">Context</span>
    </div>
    <a href="https://github.com/..." target="_blank" rel="noopener" class="project-link">View on GitHub →</a>
</article>
```

Omit the `<a class="project-link">` to hide the link button on projects without a public repo.

### Add an experience entry

Inside `<div class="experience-timeline">` in `index.html`:

```html
<article class="experience-card">
    <div class="exp-header">
        <h3>Org name</h3>
        <span class="exp-date">Month YYYY – Month YYYY</span>
    </div>
    <p class="exp-role">Role title</p>
    <ul class="exp-bullets">
        <li>Bullet…</li>
    </ul>
    <div class="exp-tags">
        <span class="tag">Tag</span>
    </div>
</article>
```

### Change the color theme

Edit the variables at the top of `styles.css`. Current theme is forest green:

```css
:root {
    --primary: #2d6a4f;        /* forest green */
    --primary-dark: #1b4332;   /* deep pine */
    --primary-light: #d8f3dc;  /* mint */
    /* … */
}
```

Other tested palettes:

- **Blue (default Tailwind)**: `#2563eb / #1e40af / #dbeafe`
- **Terracotta**: `#b45309 / #7c2d12 / #fed7aa`
- **Slate stone**: `#475569 / #1e293b / #e2e8f0`
- **Deep teal**: `#0f766e / #134e4a / #ccfbf1`
- **Amber + charcoal**: `#d97706 / #78350f / #fde68a`

### Swap the hero portrait photos

The hero auto-cycles through `hero/photo-1.jpg`, `hero/photo-2.jpg`, `hero/photo-3.jpg` (5.5 s per slide, hover to pause, click a dot to jump). They're center-cropped to 4:5 portrait. To swap:

1. Drop a replacement at the same filename in `hero/`. Best results at 800×1000 (or larger 4:5).
2. Update the `<img alt="…">` text in `index.html` so the new photo is described correctly.
3. Want more or fewer photos? Add/remove `<img>` and `<button class="hero-dot">` pairs inside `<div class="hero-portrait">`.

### Add FTC photos to the memory gallery

The FTC project card is a featured gallery with 6 photo slots and a click-to-zoom lightbox. Drop your photos into `ftc-gallery/` named `photo-1.jpg` through `photo-6.jpg`. Missing slots render a styled placeholder, so the layout never looks broken. See `ftc-gallery/README.md` for details (naming, captions, adjusting the slot count).

### Compress new poster images

If you add another large image, resize it to a web-friendly size (the original HaptiNav PNG was 12000×9600 / 25 MB):

```bash
python -c "from PIL import Image, ImageOps; \
img = Image.open('input.png'); img = ImageOps.exif_transpose(img); \
img.thumbnail((1600, 1600), Image.LANCZOS); \
img.convert('RGB').save('output.jpg', 'JPEG', quality=82, optimize=True, progressive=True)"
```

## Deployment

### GitHub Pages

1. Push to `main`.
2. Repo Settings → Pages → Source: `Deploy from a branch` → `main` / `/ (root)`.
3. Site live at `https://<username>.github.io/portfolio/`.

### Netlify / Vercel

Connect the repo. Build command: *(none)*. Publish directory: `.`.

## Notes

- Animations honor `prefers-reduced-motion`.
- Navbar is sticky with a subtle backdrop blur; the active section auto-highlights on scroll.
- The footer year auto-updates via `script.js` (`#footer-year`).
- The `franklinfucab-bit` GitHub link in the contact section is generic; swap in a different default if you prefer.

## Project repos

| Project | Repo |
| --- | --- |
| HaptiNav | <https://github.com/Xheawn/haptic-nav-system> |
| Diabetes-FCT LLM Benchmark | <https://github.com/franklinfucab-bit/Diabete-Hallucination-Benchmark> |
| Husky Robotics drone firmware | <https://github.com/franklinfucab-bit/NUCLEO-H753ZI_Test_1_IMU> |
| Automated laser marking | <https://github.com/franklinfucab-bit/Automated-Laser-Marking-System-for-EP-tube> |
| Vibrotactile navigation | *(TBD)* |
| FTC Griffinators | *(TBD)* |
