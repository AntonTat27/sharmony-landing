/* global CMS, h */

// About Us preview template.
// This renders a Tailwind-classed skeleton using the entry frontmatter fields.

(function registerAboutUsPreview() {
  if (typeof CMS === 'undefined' || typeof h === 'undefined') return;

  const get = (entry, key, fallback = '') => {
    try {
      const v = entry.getIn(['data', key]);
      return v === undefined || v === null ? fallback : v;
    } catch (_) {
      return fallback;
    }
  };

  const AboutUsPreview = ({ entry }) => {
    const title = get(entry, 'title');

    const heroEyebrow = get(entry, 'hero_eyebrow');
    const hero1 = get(entry, 'hero_h1_line1');
    const hero2 = get(entry, 'hero_h1_line2');
    const heroAccent = get(entry, 'hero_h1_accent');
    const heroDesc = get(entry, 'hero_description');

    const stat = (i) => ({
      value: get(entry, `hero_stat_${i}_value`),
      label: get(entry, `hero_stat_${i}_label`),
    });

    const stats = [stat(1), stat(2), stat(3), stat(4)].filter(
      (s) => String(s.value).trim() || String(s.label).trim()
    );

    const teamEyebrow = get(entry, 'team_eyebrow');
    const teamH2 = get(entry, 'team_h2');
    const teamSwipe = get(entry, 'team_swipe_hint');

    const principlesEyebrow = get(entry, 'principles_eyebrow');
    const principlesH2 = get(entry, 'principles_h2');

    const factsEyebrow = get(entry, 'facts_eyebrow');
    const factsH2 = get(entry, 'facts_h2');

    const numbersEyebrow = get(entry, 'numbers_eyebrow');
    const numbersH2 = get(entry, 'numbers_h2');

    // Wrapper that roughly matches your page spacing.
    return h(
      'div',
      { className: 'min-h-screen bg-white text-slate-900' },

      // Debug ribbon so we know this template is active.
      h(
        'div',
        {
          className:
            'sticky top-0 z-50 mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-amber-900 text-sm',
        },
        'Decap preview template active: about_us'
      ),

      h(
        'div',
        { className: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10' },

        // Header-ish
        h(
          'div',
          { className: 'mb-10' },
          h('div', { className: 'text-3xl font-semibold tracking-tight' }, title || 'About Us')
        ),

        // Hero
        h(
          'section',
          { className: 'rounded-2xl border border-slate-200 p-6 sm:p-10 mb-10' },
          heroEyebrow
            ? h('div', { className: 'text-sm font-medium uppercase tracking-widest text-slate-500 mb-3' }, heroEyebrow)
            : null,
          h(
            'div',
            { className: 'text-4xl sm:text-5xl font-semibold leading-tight' },
            hero1 ? h('div', null, hero1) : null,
            hero2 ? h('div', null, hero2) : null
          ),
          heroAccent
            ? h('div', { className: 'mt-3 text-xl sm:text-2xl text-slate-600' }, heroAccent)
            : null,
          heroDesc ? h('p', { className: 'mt-4 max-w-3xl text-slate-600' }, heroDesc) : null,

          stats.length
            ? h(
                'div',
                { className: 'mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4' },
                stats.map((s, idx) =>
                  h(
                    'div',
                    { key: idx, className: 'rounded-xl bg-slate-50 p-4 border border-slate-200' },
                    h('div', { className: 'text-2xl font-semibold' }, s.value),
                    h('div', { className: 'text-sm text-slate-600 mt-1' }, s.label)
                  )
                )
              )
            : null
        ),

        // Team
        h(
          'section',
          { className: 'mb-10' },
          teamEyebrow
            ? h('div', { className: 'text-sm font-medium uppercase tracking-widest text-slate-500 mb-2' }, teamEyebrow)
            : null,
          teamH2 ? h('h2', { className: 'text-2xl font-semibold' }, teamH2) : null,
          teamSwipe ? h('div', { className: 'text-sm text-slate-500 mt-2' }, teamSwipe) : null,
          h(
            'div',
            { className: 'mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4' },
            [1, 2, 3, 4].map((i) => {
              const t = get(entry, `team_dept_${i}_title`);
              const d = get(entry, `team_dept_${i}_desc`);
              if (!String(t).trim() && !String(d).trim()) return null;
              return h(
                'div',
                { key: i, className: 'rounded-2xl border border-slate-200 p-5' },
                h('div', { className: 'font-semibold' }, t),
                h('div', { className: 'text-slate-600 mt-2' }, d)
              );
            })
          )
        ),

        // Principles
        h(
          'section',
          { className: 'mb-10' },
          principlesEyebrow
            ? h('div', { className: 'text-sm font-medium uppercase tracking-widest text-slate-500 mb-2' }, principlesEyebrow)
            : null,
          principlesH2 ? h('h2', { className: 'text-2xl font-semibold' }, principlesH2) : null,
          h(
            'div',
            { className: 'mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4' },
            [1, 2, 3, 4].map((i) => {
              const t = get(entry, `principles_${i}_title`);
              const d = get(entry, `principles_${i}_desc`);
              if (!String(t).trim() && !String(d).trim()) return null;
              return h(
                'div',
                { key: i, className: 'rounded-2xl bg-slate-50 border border-slate-200 p-5' },
                h('div', { className: 'font-semibold' }, t),
                h('div', { className: 'text-slate-600 mt-2' }, d)
              );
            })
          )
        ),

        // Facts
        h(
          'section',
          { className: 'mb-10' },
          factsEyebrow
            ? h('div', { className: 'text-sm font-medium uppercase tracking-widest text-slate-500 mb-2' }, factsEyebrow)
            : null,
          factsH2 ? h('h2', { className: 'text-2xl font-semibold' }, factsH2) : null,
          h(
            'div',
            { className: 'mt-4 rounded-2xl border border-slate-200 p-6' },
            h(
              'dl',
              { className: 'grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4' },
              [
                ['facts_founded_label', 'facts_founded_value'],
                ['facts_legal_label', 'facts_legal_value_1'],
                [null, 'facts_legal_value_2'],
                [null, 'facts_legal_value_3'],
                ['facts_partners_label', 'facts_partners_value'],
                ['facts_founder_label', 'facts_founder_link'],
              ].map(([kLabel, kVal], idx) => {
                const label = kLabel ? get(entry, kLabel) : '';
                const value = get(entry, kVal);
                if (!String(label).trim() && !String(value).trim()) return null;
                return h(
                  'div',
                  { key: idx },
                  label ? h('dt', { className: 'text-sm text-slate-500' }, label) : null,
                  h('dd', { className: 'mt-1 text-slate-800' }, value)
                );
              })
            )
          )
        ),

        // Numbers
        h(
          'section',
          { className: 'mb-2' },
          numbersEyebrow
            ? h('div', { className: 'text-sm font-medium uppercase tracking-widest text-slate-500 mb-2' }, numbersEyebrow)
            : null,
          numbersH2 ? h('h2', { className: 'text-2xl font-semibold' }, numbersH2) : null,
          h(
            'div',
            { className: 'mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' },
            [1, 2, 3, 4].map((i) => {
              const label = get(entry, `numbers_stat_${i}_label`);
              const value = get(entry, `hero_stat_${i}_value`);
              if (!String(label).trim() && !String(value).trim()) return null;
              return h(
                'div',
                { key: i, className: 'rounded-2xl border border-slate-200 p-5' },
                h('div', { className: 'text-2xl font-semibold' }, value),
                h('div', { className: 'text-slate-600 mt-1' }, label)
              );
            })
          )
        )
      )
    );
  };

  // Decap’s template key for "files" collections can vary by version.
  // Register under a few common keys so it reliably attaches.
  const keysToTry = [
    'about_us',
    'english',
    'english/about_us',
    'english:about_us',
  ];

  keysToTry.forEach((key) => {
    try {
      CMS.registerPreviewTemplate(key, AboutUsPreview);
    } catch (_) {
      // ignore
    }
  });
})();
