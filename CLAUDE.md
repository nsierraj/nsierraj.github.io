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
- `_config.yml` — site identity (title, description, avatar), `navbar-links`, `social-network-links`, `share-links-active`, and color scheme keys. Beautiful Jekyll is config-driven rather than sass-override-driven, so most theming lives here.
- `index.html` — homepage; Beautiful Jekyll's `home` layout renders the page body as an intro above the post feed.
- `about.md`, `tags.html` — flat pages wired into `navbar-links` in `_config.yml` (no sidebar-tabs collection).
- `feed.xml`, `404.html` — ported from the theme's own repo since the gem doesn't auto-package its root-level pages; the RSS footer icon and tag chips link to these internally, so `htmlproofer` depends on them existing.
- `_includes/favicons.html` — favicon `<link>` override for `favicon.svg` (also the navbar avatar), wired in via each page's `head-extra` front matter default rather than a theme-file override. PWA/manifest icons are not configured.
- Other theme customization: override files from the gem per standard Jekyll theme-override conventions (`bundle info --path beautiful-jekyll-theme`).

## Gotchas
- Don't override `_includes/head.html` — it holds Beautiful Jekyll's meta/OG-tag/analytics logic. To add `<head>` content, add filenames to a page's (or a `defaults:` scope's) `head-extra:` list instead, as `_config.yml` already does for `favicons.html`.
- `Gemfile.lock`: CI uses `bundler-cache`; committing it gives reproducible builds.
- No test suite beyond the htmlproofer check in CI.
