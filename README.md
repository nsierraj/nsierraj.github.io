# nsierraj.github.io

Personal blog, built with Jekyll and the [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) theme, deployed to GitHub Pages at https://nsierraj.github.io by GitHub Actions on every push to `main`.

## Local development

Requires Ruby 3.1 or newer (on macOS, e.g. `brew install ruby@3.3`).

```
bundle install
bundle exec jekyll serve
```

Site will be available at http://localhost:4000.

## New post

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

Add `pin: true` to keep a post at the top of the homepage.
