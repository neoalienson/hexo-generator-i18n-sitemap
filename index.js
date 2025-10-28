'use strict';

const { URL } = require('url');
const { getBasePath, isHomepageIndexHtml } = require('./lib');

// Generate sitemap.xml
hexo.extend.generator.register('sitemap-i18n', function(locals) {
  const config = this.config;
  const sitemapConfig = config.sitemap_i18n || {};
  
  // Check if generator is disabled
  if (sitemapConfig.enable === false) {
    return [];
  }
  
  const languages = sitemapConfig.languages || ['en', 'zh-TW', 'zh-CN', 'ja'];
  
  // Group pages by base path
  const pageGroups = new Map();
  
  locals.pages.forEach(page => {
    const basePath = getBasePath(page.path, languages);
    if (!pageGroups.has(basePath)) {
      pageGroups.set(basePath, []);
    }
    pageGroups.get(basePath).push(page);
  });
  
  locals.posts.forEach(post => {
    const basePath = getBasePath(post.path, languages);
    if (!pageGroups.has(basePath)) {
      pageGroups.set(basePath, []);
    }
    pageGroups.get(basePath).push(post);
  });
  
  // Generate sitemap XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add homepage URLs for each language
  const today = new Date().toISOString().split('T')[0];
  
  // English homepage (priority 1.0)
  xml += '  <url>\n';
  xml += `    <loc>${config.url}/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += '  </url>\n';
  
  // Other language homepages (priority 0.9)
  languages.forEach(lang => {
    if (lang !== 'en') {
      xml += '  <url>\n';
      xml += `    <loc>${config.url}/${lang}/</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += '  </url>\n';
    }
  });
  
  pageGroups.forEach((pages) => {
    pages.forEach(page => {
      // Skip homepage index.html duplicates (we already added / and /lang/ above)
      if (isHomepageIndexHtml(page.path, languages)) {
        return;
      }
      
      const url = new URL(page.path, config.url).href;
      const updated = page.updated || page.date || new Date();
      const changefreq = page.sitemap_changefreq || sitemapConfig.changefreq || 'monthly';
      const priority = page.sitemap_priority !== undefined ? page.sitemap_priority : (sitemapConfig.priority !== undefined ? sitemapConfig.priority : 0.6);
      
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${updated.toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += '  </url>\n';
    });
  });
  
  xml += '</urlset>';
  
  // Generate sitemap.txt (simple URL list)
  let txt = '';
  
  // Add homepage URLs
  txt += `${config.url}/\n`;
  languages.forEach(lang => {
    if (lang !== 'en') {
      txt += `${config.url}/${lang}/\n`;
    }
  });
  
  // Add all other URLs
  pageGroups.forEach((pages) => {
    pages.forEach(page => {
      if (isHomepageIndexHtml(page.path, languages)) {
        return;
      }
      const url = new URL(page.path, config.url).href;
      txt += `${url}\n`;
    });
  });
  
  return [
    {
      path: 'sitemap.xml',
      data: xml
    },
    {
      path: 'sitemap.txt',
      data: txt
    }
  ];
});




