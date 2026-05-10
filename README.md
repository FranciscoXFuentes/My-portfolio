# Portfolio

A bold, motion-rich portfolio template — plain HTML / CSS / JS, no build step.

```
.
├── index.html        ← home page (hero, about, work grid, skills, contact)
├── project.html      ← shared template for every project detail page
├── styles.css        ← all styling
├── common.js         ← shared helpers + page setup (cursor, nav, reveals)
├── script.js         ← home-page rendering (projects grid + skills)
├── project.js        ← detail-page rendering (reads ?id=<slug>)
├── projects.js       ← YOUR projects + skills (edit this most)
├── assets/images/    ← drop project screenshots / cover images here
├── assets/decks/     ← drop slide decks (.pptx, .pdf) here
├── .nojekyll         ← tells GitHub Pages to skip Jekyll processing
└── README.md
```

## Run it locally

Open `index.html` in a browser, or:

```powershell
npx serve .
# or
python -m http.server 8000
```

> Project detail pages need the file:// or http:// fetch to resolve the
> query string, so opening `project.html?id=foo` directly works either way.

## Adding a project

Open `projects.js` and add a new object to the `projects` array:

```js
{
  slug: "my-new-thing",                   // URL id — must be unique
  title: "My new thing",
  description: "Short tagline shown on the home grid.",
  image: "assets/images/my-new-thing.png", // "" for auto placeholder
  year: "2026",
  role: "Solo build",                      // optional
  tech: ["React", "Tailwind"],             // optional, shown on detail page
  demo: "https://my-new-thing.com",        // "" hides the button
  github: "https://github.com/you/my-new-thing", // "" hides the button
  slides: "assets/decks/my-new-thing.pptx", // optional slide deck — "" hides
  longDescription: [
    "Paragraph one.",
    "Paragraph two."
  ],
  gallery: ["assets/images/my-new-thing-2.png"], // optional extra screenshots
}
```

The card on the home grid links automatically to `project.html?id=my-new-thing`.

### Image guidance
- **Cover** (`image`): 1600×900 (16:9) for the detail page; cropped to 4:3 on the home grid. PNG, JPG, or SVG.
- **Gallery**: anything 4:3 works.
- Leave `image: ""` and a unique geometric placeholder is generated for that slot — useful while you're still gathering screenshots.

### Editing skills
Same file, `skills` array. Just strings — add or remove freely.

## Personal copy

Most personal text lives in `index.html`. The placeholders to replace:

- Hero block — name, role tagline, short bio
- About heading + body paragraphs
- About facts list (Based in / Currently / Stack)
- Footer copyright line
- Social URLs in the contact section (your email is already wired)

The detail page reuses the same nav and footer, so any changes there
propagate automatically.

## Customising the look

All colors and fonts are CSS custom properties at the top of `styles.css`:

```css
:root {
  --bg:       #fafaf5;   /* off-white */
  --ink:      #0a0a0a;
  --lime:     #84cc16;   /* the accent */
  /* … */
}
```

Change `--lime` to swap the accent color globally.

## Deploying to GitHub Pages

1. Create a new GitHub repo and push this folder to it.
2. Repo **Settings → Pages**.
3. **Source:** `Deploy from a branch`. **Branch:** `main` / `(root)`.
4. Save. Your site is live at `https://<username>.github.io/<repo>/` in ~1 min.

For a custom domain, add a `CNAME` file at the root with your domain on
one line, then point your DNS at GitHub's servers (their docs walk you
through it).

The `.nojekyll` file is already included so GitHub Pages serves the files
as-is without trying to run them through Jekyll.

## Notes

- Respects `prefers-reduced-motion` — animations are disabled for users
  who ask for it via OS settings.
- No JS dependencies. Two Google Fonts (Space Grotesk + JetBrains Mono)
  loaded via CDN.
- The cursor follower only shows on fine-pointer devices (mice/trackpads),
  not touch.
- Detail-page URLs use `?id=<slug>` because that works on GitHub Pages
  with no build step. If you ever switch to pretty URLs (`/projects/foo`),
  you'll need a generator (Astro, Eleventy, etc.) or a 404.html redirect
  trick.
