# Personal website

A small React site with pages: Home, Tech Experience, Portfolio, Music and Contact.
Built with Vite, React, TypeScript and React Router.

## Run it

```sh
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Where things live

| To change…                 | Edit                                         |
| -------------------------- | -------------------------------------------- |
| Any text, links, jobs, projects, tracks | `src/content/site.ts`          |
| Portfolio projects (case studies) | `src/content/projects.ts`; images and videos go in `public/images/projects/<slug>/` |
| Your photo                 | `public/images/profile/profile.jpg`, referenced by `home.photo` in `src/content/site.ts`. `position` controls the crop. |
| Your resume                | `public/William_Su_Resume.pdf`, referenced by `work.resumeUrl` |
| Which pages exist / menu order | `src/pages/index.ts`                      |
| Colors, fonts, shapes      | `src/theme/themes/*.css`                      |
| Which theme is active      | `activeTheme` in `src/theme/config.ts`        |
| Spacing and type scale     | `src/theme/tokens.css`                        |
| Wood, film grain and photo grade | `public/textures/` (walnut veneer from Poly Haven, CC0, recoloured to the theme; generated grain tile), set in `src/theme/tokens.css` |

`originals/` holds full-size source files straight from the phone, in the same
folders as their web copies in `public/images/`. They're git-ignored because
they carry GPS location (and the Exie screenshots show classmates' names). To
add a photo: put the original in `originals/`, then save a resized copy with
the metadata stripped into `public/images/`.

```
public/images/
  profile/       profile photo, will in space artist photo
  backgrounds/   Portfolio desk backgrounds (photos and the surfing video)
  music/         Music page photo
  logos/         school and company logos (Tech page)
  projects/<slug>/  case-study covers, screenshots and demo videos
public/textures/ wood and film grain
originals/       full-size sources, same folders as above (not committed)
```

## Project layout

```
public/            static files served as-is (images, textures, resume, favicon)
originals/         full-size source images, not used by the site (git-ignored)
src/
  content/site.ts  all site text and links
  pages/           one component per page, plus pages/index.ts (the page list)
  components/      Layout (header, menu, footer), Photo, PageHeader
  theme/           tokens.css, themes/*.css and config.ts (active theme)
  styles/          global styles
```

## Changing the design

Components never hard-code colors or fonts. They read CSS variables
(`--color-bg`, `--font-display`, `--photo-radius`, …) that each theme file sets
under `[data-theme='<name>']`.

Two themes ship with the site:

- `cream-rug`: light 70s modern (the default).
- `walnut`: dark 70s modern with a walnut photo frame.

To switch, change `activeTheme` in `src/theme/config.ts`.

To make a new theme:

1. Copy `src/theme/themes/cream-rug.css` to a new file and rename the selector,
   e.g. `[data-theme='sunroom']`.
2. Change the variable values.
3. Import the file in `src/theme/config.ts` and add its name to `themes`.
4. Set `activeTheme` to the new name.

If you change fonts, update the Google Fonts `<link>` in `index.html` too.

For bigger layout changes, each page has its own component in `src/pages/`,
with shared inner-page styles in `src/pages/pages.css` and the landing page
layout in `src/pages/Home.css`.

## Deploying

`npm run build` produces a static site in `dist/`. Netlify, Vercel and
Cloudflare Pages work out of the box. The site uses browser routing
(`/tech`, `/music`), so configure the host to serve `index.html` for unknown
paths. Netlify and Vercel's Vite presets handle this. For GitHub Pages,
switch `BrowserRouter` to `HashRouter` in `src/main.tsx`.
