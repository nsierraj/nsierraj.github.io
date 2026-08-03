# CLAUDE.md

## Overview
Personal Jekyll blog for Amado Sierra, hosted on GitHub Pages at https://nsierraj.github.io. Deployment is automatic on push to `main` via GitHub Pages' built-in Jekyll build — there is no custom CI/Actions workflow.

## Commands
```
bundle install
bundle exec jekyll serve   # local dev at http://localhost:4000
bundle exec jekyll build   # static output to _site/
```

## Adding a post
Create `_posts/YYYY-MM-DD-title.markdown` with front matter:
```
---
layout: post
title:  "Post title"
date:   YYYY-MM-DD HH:MM:SS -0000
categories: general
---
```

## Structure
- `_config.yml` — site title, description, theme (`minima`), plugins (`jekyll-feed`), markdown renderer (`kramdown`).
- `index.md` — homepage, uses minima's built-in `home` layout (post list).
- `_posts/` — blog posts.
- No custom `_layouts/`, `_includes/`, `_sass/`, or `assets/` exist yet — the site relies entirely on the gem-vendored `minima` theme. To customize appearance, override via those directories per standard Jekyll theme-override conventions.

## Gotchas
- `Gemfile.lock` is not committed. GitHub Pages recommends committing it for reproducible builds matching their build environment — flag this if generating one via `bundle install`, rather than deciding unilaterally whether to commit it.
- No test suite, linter, or CI configured.
