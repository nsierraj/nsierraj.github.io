# CLAUDE.md

## Overview
Personal Jekyll blog for Amado Sierra, hosted on GitHub Pages at https://nsierraj.github.io, using the [Beautiful Jekyll](https://beautifuljekyll.com) theme (`beautiful-jekyll-theme` gem, Jekyll 4). Deployment is via the GitHub Actions workflow `.github/workflows/pages-deploy.yml` on push to `main` (repo Settings → Pages → Source must be "GitHub Actions"). The workflow builds, runs `htmlproofer` (internal links only), and deploys.

## Commands
Requires Ruby >= 3.1 (macOS system Ruby 2.6 is too old; locally Homebrew `ruby@3.3` is used).
```
bundle install
bundle exec jekyll serve   # local dev at http://localhost:4000
bundle exec jekyll build   # static output to _site/
bundle exec htmlproofer _site --disable-external   # same link check CI runs
```

## Adding a post
Create `_posts/YYYY-MM-DD-title.markdown` with front matter:
```
---
title:  "Post title"
date:   YYYY-MM-DD HH:MM:SS -0000
categories: general
tags: [tag1, tag2]
---
```
`layout: post` is applied by default. Posts are served at `/posts/:title/`.

## Structure
- `_config.yml` — site identity (title, description, avatar), `navbar-links`, `social-network-links`, `share-links-active`, and `site-js`. Colors are NOT here: the theme's color keys (`page-col`, `link-col`, `navbar-col`, ...) are deliberately unset because they feed `beautifuljekyll.css` and would fight dark mode.
- `index.html` — homepage; Beautiful Jekyll's `home` layout renders the page body as an intro above the post feed.
- `about.md`, `tags.html` — flat pages wired into `navbar-links` in `_config.yml` (no sidebar-tabs collection).
- `feed.xml`, `404.html` — ported from the theme's own repo since the gem doesn't auto-package its root-level pages; the RSS footer icon and tag chips link to these internally, so `htmlproofer` depends on them existing.
- Look and feel (adapted from the design language of ivanball.github.io, written from scratch since that repo has no license): `assets/css/site.css` holds the design tokens (type/spacing scale, light + dark palettes via `prefers-color-scheme` and `data-theme`) and all component styles; `assets/js/theme.js` is the theme toggle (localStorage `as-theme`) and mobile nav; `assets/fonts/` self-hosts Inter + JetBrains Mono (OFL, see its README). `_includes/site-theme.html` (added via `head-extra`) sets the theme before paint, preloads fonts and links `site.css` after `beautifuljekyll.css`.
- Theme overrides that replace the gem's Bootstrap-navbar markup: `_includes/nav.html`, `header.html` (hero band), `footer.html`, `_layouts/{base,default,page,post,home}.html`, and a trimmed `assets/js/beautifuljekyll.js` (its navbar code throws without `.navbar`). They use their own class names (`.site-header`, `.post-card`, `.pager`, `.chip`, ...) so the theme's selectors don't match; only element-level theme rules (body, headings, links, code, tables) are overridden in `site.css`. `tags.html` was moved to the same classes. Cover images (`cover-img`) and `post_search` are no longer rendered.
- `_includes/favicons.html` — favicon `<link>` override for `favicon.svg` (also the navbar avatar), wired in via each page's `head-extra` front matter default rather than a theme-file override. PWA/manifest icons are not configured.
- Other theme customization: override files from the gem per standard Jekyll theme-override conventions (`bundle info --path beautiful-jekyll-theme`).

## Gotchas
- `timezone: UTC` in `_config.yml` must match the `-0000` offset in post front matter. With a local timezone (it was `America/New_York`), a post dated `... 00:00:00 -0000` rendered as the previous day on the home page, tags page and feed.
- External links get `target="_blank" rel="noopener noreferrer"` automatically at build time via the `jekyll-target-blank` plugin (Gemfile + `plugins:` in `_config.yml`), including theme-generated ones; no per-link markup is needed in posts.
- `head-extra` replaces rather than merges: both `defaults:` scopes list `["favicons.html", "site-theme.html"]`, and any page that sets its own `head-extra` must repeat both or it loses the theme CSS and pre-paint theme script.
- Don't override `_includes/head.html` — it holds Beautiful Jekyll's meta/OG-tag/analytics logic. To add `<head>` content, add filenames to a page's (or a `defaults:` scope's) `head-extra:` list instead, as `_config.yml` already does for `favicons.html`.
- `Gemfile.lock`: CI uses `bundler-cache`; committing it gives reproducible builds.
- No test suite beyond the htmlproofer check in CI.
