# hexo-generator-i18n-sitemap

[![npm version](https://badge.fury.io/js/hexo-generator-i18n-sitemap.svg)](https://badge.fury.io/js/hexo-generator-i18n-sitemap)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Hexo plugin that generates sitemap.xml for multilingual sites.

## Features

- Generates sitemap.xml and sitemap.txt with all pages and posts
- Excludes homepage `index.html` duplicates from sitemap
- Unit tested for reliability

## Installation

```bash
npm install hexo-generator-i18n-sitemap
```

## Configuration

Add to `_config.yml` (all options are optional):

```yaml
sitemap_i18n:
  enable: true         # Enable/disable generator (default: true)
  languages:           # Optional, defaults to ['en', 'zh-TW', 'zh-CN', 'ja']
    - en
    - zh-TW
    - zh-CN
    - ja
  changefreq: monthly  # Default changefreq (optional)
  priority: 0.6        # Default priority (optional)
```

To disable the generator:

```yaml
sitemap_i18n:
  enable: false
```

### Per-Page Configuration

You can override defaults in front matter:

```yaml
---
title: Important Page
sitemap_changefreq: daily
sitemap_priority: 1.0
---
```

**Valid changefreq values**: `always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`

**Priority range**: 0.0 to 1.0

## What It Does

The plugin generates sitemap.xml and sitemap.txt with all URLs from your multilingual site.

## Usage

Just install and configure. The plugin runs automatically during `hexo generate`.

## Testing

Run unit tests:

```bash
npm test
```

Tests verify:
- Base path extraction from language-prefixed URLs
- Homepage index.html detection and filtering
- Proper handling of all supported languages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
