function getBasePath(path, languages) {
  let basePath = path;
  for (const lang of languages) {
    if (lang !== 'en' && path.startsWith(`${lang}/`)) {
      basePath = path.replace(`${lang}/`, '');
      break;
    }
  }
  return basePath;
}

function isHomepageIndexHtml(path, languages) {
  // Check if path is homepage index.html for any language
  if (path === 'index.html') return true;
  
  for (const lang of languages) {
    if (lang !== 'en' && path === `${lang}/index.html`) {
      return true;
    }
  }
  
  return false;
}

module.exports = { getBasePath, isHomepageIndexHtml };
