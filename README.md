# nsierraj.github.io

Personal blog for Amado Sierra, built with Jekyll and the [Beautiful Jekyll](https://beautifuljekyll.com) theme (`beautiful-jekyll-theme` gem, Jekyll 4), deployed to GitHub Pages at https://nsierraj.github.io.

Deployment runs via the GitHub Actions workflow `.github/workflows/pages-deploy.yml` on every push to `main` (repo Settings → Pages → Source must be set to "GitHub Actions"). The workflow builds the site, runs `htmlproofer` against internal links, and deploys the result.

## Local development

Requires Ruby 3.1 or newer (macOS system Ruby 2.6 is too old; locally, Homebrew `ruby@3.3` is used, e.g. `brew install ruby@3.3`).

```
bundle install
bundle exec jekyll serve   # local dev at http://localhost:4000
bundle exec jekyll build   # static output to _site/
bundle exec htmlproofer _site --disable-external   # same link check CI runs
```

## Adding a post

Add a file to `_posts/` named `YYYY-MM-DD-title.markdown` with front matter:

```
---
title:  "Post title"
date:   YYYY-MM-DD HH:MM:SS -0000
categories: general
tags: [tag1, tag2]
---
Post content here.
```

`layout: post` is applied by default. Posts are served at `/posts/:title/`.

## Structure

- `_config.yml` — site identity (title, description, avatar), `navbar-links`, `social-network-links`, `share-links-active`, and color scheme keys. Beautiful Jekyll is config-driven rather than sass-override-driven, so most theming lives here.
- `index.html` — homepage; Beautiful Jekyll's `home` layout renders the page body as an intro above the post feed.
- `about.md`, `tags.html` — flat pages wired into `navbar-links` in `_config.yml` (Beautiful Jekyll has no sidebar-tabs collection like Chirpy did).
- `feed.xml`, `404.html` — ported from the theme's own repo since the gem doesn't auto-package its root-level pages; the RSS footer icon and tag chips link to these internally, so `htmlproofer` depends on them existing.
- `_includes/favicons.html` — favicon `<link>` override for `favicon.svg` (also the navbar avatar), wired in via each page's `head-extra` front matter default rather than a theme-file override.
- Other theme customizations override files from the gem per standard Jekyll theme-override conventions (`bundle info --path beautiful-jekyll-theme`).

## Gotchas

- Don't override `_includes/head.html` — it holds Beautiful Jekyll's meta/OG-tag/analytics logic. To add `<head>` content, add filenames to a page's (or a `defaults:` scope's) `head-extra:` list instead, as `_config.yml` already does for `favicons.html`.
- `Gemfile.lock` is committed for reproducible builds; CI uses `bundler-cache`.
- No test suite beyond the `htmlproofer` check in CI.
