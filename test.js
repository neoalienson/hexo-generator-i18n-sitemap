const assert = require('assert');
const { getBasePath, isHomepageIndexHtml } = require('./lib.js');

const languages = ['en', 'zh-TW', 'zh-CN', 'ja'];

// Run tests
if (require.main === module) {
  console.log('Running tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  const tests = [
    // getBasePath tests
    { name: 'getBasePath - English path', fn: () => assert.strictEqual(getBasePath('about/index.html', languages), 'about/index.html') },
    { name: 'getBasePath - zh-TW path', fn: () => assert.strictEqual(getBasePath('zh-TW/about/index.html', languages), 'about/index.html') },
    { name: 'getBasePath - zh-CN path', fn: () => assert.strictEqual(getBasePath('zh-CN/about/index.html', languages), 'about/index.html') },
    { name: 'getBasePath - ja path', fn: () => assert.strictEqual(getBasePath('ja/about/index.html', languages), 'about/index.html') },
    { name: 'getBasePath - root index', fn: () => assert.strictEqual(getBasePath('index.html', languages), 'index.html') },
    
    // isHomepageIndexHtml tests
    { name: 'isHomepageIndexHtml - root index.html', fn: () => assert.strictEqual(isHomepageIndexHtml('index.html', languages), true) },
    { name: 'isHomepageIndexHtml - zh-TW/index.html', fn: () => assert.strictEqual(isHomepageIndexHtml('zh-TW/index.html', languages), true) },
    { name: 'isHomepageIndexHtml - zh-CN/index.html', fn: () => assert.strictEqual(isHomepageIndexHtml('zh-CN/index.html', languages), true) },
    { name: 'isHomepageIndexHtml - ja/index.html', fn: () => assert.strictEqual(isHomepageIndexHtml('ja/index.html', languages), true) },
    { name: 'isHomepageIndexHtml - about/index.html', fn: () => assert.strictEqual(isHomepageIndexHtml('about/index.html', languages), false) },
    { name: 'isHomepageIndexHtml - zh-TW/about/index.html', fn: () => assert.strictEqual(isHomepageIndexHtml('zh-TW/about/index.html', languages), false) },
    { name: 'isHomepageIndexHtml - tools/index.html', fn: () => assert.strictEqual(isHomepageIndexHtml('tools/index.html', languages), false) },
    { name: 'isHomepageIndexHtml - blog post', fn: () => assert.strictEqual(isHomepageIndexHtml('2025/01/post-title/index.html', languages), false) },
  ];
  
  tests.forEach(test => {
    try {
      test.fn();
      console.log(`✓ ${test.name}`);
      passed++;
    } catch (error) {
      console.log(`✗ ${test.name}`);
      console.log(`  ${error.message}`);
      failed++;
    }
  });
  
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}
