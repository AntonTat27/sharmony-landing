/* global CMS */

// Decap CMS loads this file after decap-cms.js and config.yml.
// We use it to make the built-site CSS available inside the preview iframe.

(function registerPreviewStyling() {
  if (typeof CMS === 'undefined') return;

  // 1) Load the same CSS files your built pages use.
  //    (These exist under /css in src/public, and are served at /css/... at runtime.)
  const cssFiles = [
    '/css/style.css',
    '/css/output.css',
    '/css/main.min.1bdb1abc2288d1cdeb1a65690b0e7dccf6341f7aa85357897a863869daf04de7.css',
    '/css/header.min.cbbbe3b8e83a695310a63135f35762619901719c4188998730c0ee218df327c7.css',
    '/css/hero.min.52bc23718897492cafba9e6c461427eb17a1dabe9e7c389af12ad7d64dba9c59.css',
    '/css/slogan.min.108da308132d926b71978cc04c6d1cb8295348377c3633da7ce1ef2f8816af44.css',
    '/css/numbers.min.9b371e70c38cd603155e7737e0613c3bd9fceeb3f69be4ffe3aac4d7ad31c0f4.css',
    '/css/audience.min.1b529f9d051ec11fda90c9b2c672639bc454efe45ccbc12c0a9914c00113794d.css',
    '/css/locations.min.57e28bb48a24d54b6d29d5df611526b5c42f513f470600b123512dde33450ad7.css',
    '/css/advantages.min.ef1bd1826f44ca17a14520a0efc261b46eb04716f2840677378d8752800ba279.css',
    '/css/how-it-works.min.10a74b9d9658ce2119d92f719a6528894d983b6eb385212ff83a73a257a2afe0.css',
    '/css/recommendations.min.fbd9aa02a6fcb47e3ccbcf9f2bddee8de12c384ea592046dca7095f005f96db9.css',
    '/css/faq.min.df79eea43777815c2be0e7c07cd17ff2946a9f4ef5660af1a1597c7d3f9707ac.css',
    '/css/footer.min.37ec8e0ee85cda35ecf7e955538416f185e1addee8ef71c197df0f62670259a0.css',
    '/css/contact_us.min.23d78bd8cf07b4a9ec749c81b15cb401910c06a8fc3e7f4096de55e86123b78f.css',
  ];

  cssFiles.forEach((href) => {
    try {
      CMS.registerPreviewStyle(href, { raw: false });
    } catch (_) {
      // Ignore missing files in environments where the site isn't built.
    }
  });

  // Small baseline so default preview DOM has breathing room.
  CMS.registerPreviewStyle(
    'body { padding: 24px; box-sizing: border-box; background: white; }',
    { raw: true }
  );

  // 2) Tailwind CDN is a *script*, not a CSS file. `registerPreviewStyle()` won't load it.
  //    So we inject a <script> tag into the preview iframe whenever it loads.
  //
  //    This makes Tailwind utility classes (flex, gap-*, text-*, etc.) actually work.
  const injectTailwindIfMissing = (doc) => {
    if (!doc || !doc.head) return;

    const existing = doc.head.querySelector('script[data-decaps-tailwind]');
    if (existing) return;

    const s = doc.createElement('script');
    s.src = 'https://cdn.tailwindcss.com';
    s.defer = true;
    s.setAttribute('data-decaps-tailwind', 'true');
    doc.head.appendChild(s);
  };

  // Hook into the preview pane when it becomes available.
  // The global CMS object doesn't expose the iframe directly, so we use a small polling loop.
  const tryAttach = () => {
    const iframe = document.querySelector('iframe');
    if (!iframe) return false;

    // Inject immediately if possible.
    try {
      injectTailwindIfMissing(iframe.contentDocument);
    } catch (_) {
      // cross-origin or not ready yet
    }

    // Inject after iframe reloads, too.
    iframe.addEventListener('load', () => {
      try {
        injectTailwindIfMissing(iframe.contentDocument);
      } catch (_) {
        // ignore
      }
    });

    return true;
  };

  let attempts = 0;
  const maxAttempts = 60; // ~30s
  const interval = setInterval(() => {
    attempts += 1;
    if (tryAttach() || attempts >= maxAttempts) {
      clearInterval(interval);
    }
  }, 500);
})();
