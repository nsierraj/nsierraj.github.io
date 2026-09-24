# CLAUDE.md

## Overview
Personal Jekyll blog for Amado Sierra, hosted on GitHub Pages at https://nsierraj.github.io, using the [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) theme (`jekyll-theme-chirpy` gem, Jekyll 4). Deployment is via the GitHub Actions workflow `.github/workflows/pages-deploy.yml` on push to `main` (repo Settings → Pages → Source must be "GitHub Actions"). The workflow builds, runs `htmlproofer` (internal links only), and deploys.

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
# pin: true   # keep at top of the homepage list
---
```
`layout: post` is applied by default. Posts are served at `/posts/:title/`.

## Structure
- `_config.yml` — site identity (title, tagline, social links, avatar), theme settings, based on the `chirpy-starter` template.
- `index.html` — homepage; Chirpy's `home` layout lists posts only and ignores page content (use a pinned post to feature something there).
- `_tabs/` — sidebar pages (About, Archives, Categories, Tags); `order` sets sidebar order.
- `_data/contact.yml` — sidebar icons (GitHub, LinkedIn, ServiceNow profile, RSS). `_data/share.yml` — post share buttons.
- `_includes/favicons.html` — overrides Chirpy's favicon set to use `favicon.svg` (also the sidebar avatar). PWA is disabled because no PWA icon set exists.
- Other theme customization: override files from the gem per standard Jekyll theme-override conventions (`bundle info --path jekyll-theme-chirpy`).

## Gotchas
- Don't reintroduce `_includes/head.html` (old minima override) — it would replace Chirpy's head and break the theme.
- `Gemfile.lock`: CI uses `bundler-cache`; committing it gives reproducible builds.
- No test suite beyond the htmlproofer check in CI.
