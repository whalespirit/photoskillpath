import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'content', 'PhotoSkillPath-article-package', 'articles');
const outputRoot = path.join(root, 'articles');
const siteOrigin = 'https://photoskillpath.com';

const hubForCategory = {
  exposure: { label: 'Basics', file: 'basics.html' },
  focus: { label: 'Basics', file: 'basics.html' },
  composition: { label: 'Basics', file: 'basics.html' },
  phone: { label: 'Phone', file: 'phone.html' },
  edit: { label: 'Edit', file: 'edit.html' },
  practice: { label: 'Practice', file: 'practice.html' }
};

const categoryLabel = {
  exposure: 'Exposure',
  focus: 'Focus',
  composition: 'Composition',
  phone: 'Phone photography',
  edit: 'Editing',
  practice: 'Practice'
};

function visualForArticle(metadata) {
  if (metadata.slug === 'exposure-triangle-what-to-change-first') {
    return { directory: 'article-images', file: 'exposure-triangle-camera-comparisons.webp', visualClass: 'article-contact-sheet', caption: 'Fast vs slow shutter · shallow vs deeper depth of field · lower vs higher ISO in low light.', alt: 'A six-frame photographic contact sheet comparing a sharp cyclist with motion blur, shallow and deep depth of field, and low-ISO and high-ISO low-light results.' };
  }
  if (metadata.slug === 'shutter-speed-freeze-or-show-motion') {
    return { directory: 'article-images', file: 'shutter-speed-motion-comparison.webp', visualClass: 'article-motion-triptych', caption: 'Fast shutter to freeze the rider · a slower shutter for visible wheel movement · panning to carry the background into motion.', alt: 'Three photographic shutter-speed results showing one cyclist: frozen sharply, partly blurred, and panned against a streaked background.' };
  }
  if (metadata.slug === 'camera-shake-or-missed-focus') {
    return { directory: 'article-images', file: 'blur-diagnosis-comparison.webp', visualClass: 'article-blur-diptych', caption: 'Camera shake: directional softness across the whole frame · missed focus: the intended foreground is soft while a different plane is sharp.', alt: 'Two photographic blur patterns: whole-frame directional camera shake on the left and missed focus with a sharp background on the right.' };
  }
  if (metadata.slug === 'single-vs-continuous-autofocus') {
    return { directory: 'article-images', file: 'single-continuous-autofocus-comparison.webp', visualClass: 'article-autofocus-diptych', caption: 'Single autofocus: lock focus for a subject that stays at one distance · continuous autofocus: keep updating as the subject moves toward or away from the camera.', alt: 'Two photographic autofocus situations: a sharply focused stationary book and a sharply focused child walking toward the camera.' };
  }
  if (metadata.slug === 'single-point-vs-area-autofocus') {
    return { directory: 'article-images', file: 'single-point-area-autofocus-comparison.webp', visualClass: 'article-focus-area-diptych', caption: 'Single point: place a small focus area over the predictable target · area autofocus: give a moving subject room to stay inside the search zone.', alt: 'Two photographed autofocus-area examples: a precise focus square on a mug in clutter and a larger focus area surrounding a runner on an open path.' };
  }
  if (metadata.slug === 'depth-of-field-what-will-be-sharp') {
    return { file: 'depth-of-field-comparison.svg', visualClass: 'article-depth-diagram', caption: 'A wider aperture gives a smaller useful sharp range; a narrower aperture keeps more of the near-to-far scene readable.', alt: 'A diagram comparing shallow and deeper depth of field around the same focused book.' };
  }
  if (metadata.slug === 'aperture-background-blur-depth-of-field') {
    return { file: 'aperture-three-frame-test.svg', visualClass: 'article-aperture-diagram', caption: 'The f-number moves in the opposite direction from the opening: f/2.8 is wider than f/11, so it passes more light and typically softens more of the background.', alt: 'A three-panel diagram comparing wide, middle, and narrow aperture openings with increasing background detail and decreasing light.' };
  }
  if (metadata.primary_category === 'exposure' && metadata.slug.includes('shutter-speed')) {
    return { file: 'motion-compare.svg', alt: 'A diagram comparing a frozen cyclist with a cyclist shown in motion.' };
  }
  const visuals = {
    exposure: { file: 'exposure-triangle.svg', alt: 'A triangle connecting aperture, shutter speed, ISO, and the visible result.' },
    focus: { file: 'focus-plane.svg', alt: 'A focus plane diagram showing a sharp selected subject and softer foreground and background.' },
    composition: { file: 'composition-frame.svg', alt: 'A composition grid showing a subject and a line leading the eye toward it.' },
    phone: { file: 'phone-controls.svg', alt: 'A phone camera diagram showing a focus box, exposure control, and focus-exposure lock.' },
    edit: { file: 'edit-sequence.svg', alt: 'A four-step edit sequence: crop, light, color, and stop.' },
    practice: { file: 'practice-plan.svg', alt: 'A practice loop showing choose, shoot, compare, and note.' }
  };
  return visuals[metadata.primary_category];
}

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

function inline(markdown) {
  return escapeHtml(markdown)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1 <span aria-hidden="true">↗</span></a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function tableCells(line) {
  return line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => inline(cell.trim()));
}

function markdownToHtml(markdown) {
  const clean = markdown
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\n## Sources[\s\S]*$/i, '')
    .trim();
  const lines = clean.split(/\r?\n/);
  const output = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      output.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      if (heading[1].length > 1) output.push(`<h2>${inline(heading[2])}</h2>`);
      continue;
    }

    if (line.startsWith('|') && /^\|?\s*:?-{3,}/.test(lines[index + 1]?.trim() || '')) {
      flushParagraph();
      const headers = tableCells(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      index -= 1;
      output.push(`<div class="article-table-wrap"><table><thead><tr>${headers.map((cell) => `<th>${cell}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      const items = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ''));
        index += 1;
      }
      index -= 1;
      output.push(`<ol>${items.map((item) => `<li>${inline(item)}</li>`).join('')}</ol>`);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      const items = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ''));
        index += 1;
      }
      index -= 1;
      output.push(`<ul>${items.map((item) => `<li>${inline(item)}</li>`).join('')}</ul>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  return output.join('\n');
}

function oneLanguage(value = '') {
  return String(value).split(' / ')[0].trim();
}

function articleSocialHead({ title, description, slug }) {
  const url = `${siteOrigin}/articles/${slug}.html`;
  return `<link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Photo Skill Path" />
    <meta property="og:title" content="${escapeHtml(title)} — Photo Skill Path" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(title)} — Photo Skill Path" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />`;
}

function navigation(activeFile) {
  const item = (label, file) => `<a${file === activeFile ? ' class="is-current"' : ''} href="../${file}">${label}</a>`;
  return `${item('Start', 'index.html')}${item('Basics', 'basics.html')}${item('Phone', 'phone.html')}${item('Edit', 'edit.html')}${item('Practice', 'practice.html')}`;
}

function footer() {
  return `<footer class="site-footer"><div class="shell footer-inner"><div class="footer-brand"><img src="../photo-skill-path-nav-camera.svg" width="28" height="28" alt="" /><span>Photo Skill Path</span></div><p>Photography learning for clear, observable decisions.</p><div class="footer-links"><a href="../about.html">About</a><a href="../editorial-policy.html">Editorial Policy</a><a href="../contact.html">Contact</a><a href="../privacy.html">Privacy Policy</a><a href="../terms.html">Terms of Use</a><a href="../advertising-disclosure.html">Advertising Disclosure</a></div></div></footer>`;
}

function buildArticle(article, related) {
  const { metadata, sourceMarkdown, sourceData } = article;
  const category = metadata.primary_category;
  const hub = hubForCategory[category];
  const visual = visualForArticle(metadata);
  const title = metadata.title;
  const summary = oneLanguage(metadata.meta_description || metadata.summary);
  const sources = (sourceData.sources || []).filter((source) => source.title && source.url);
  const sourceMarkup = sources.length
    ? `<section class="article-sources" aria-labelledby="sources-title"><p class="eyebrow">Research sources</p><h2 id="sources-title">Sources</h2><ul>${sources.map((source) => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.title)} <span aria-hidden="true">↗</span></a>${source.publisher ? ` <span>— ${escapeHtml(source.publisher)}</span>` : ''}</li>`).join('')}</ul></section>`
    : '';
  const relatedMarkup = related.length
    ? `<section class="article-related" aria-labelledby="related-title"><p class="eyebrow">Continue learning</p><h2 id="related-title">More in ${categoryLabel[category]}</h2><div>${related.map((item) => `<a href="${escapeHtml(item.slug)}.html"><span>${escapeHtml(item.title)}</span><b aria-hidden="true">→</b></a>`).join('')}</div></section>`
    : '';

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(summary)}" />
    <title>${escapeHtml(title)} — Photo Skill Path</title>
    ${articleSocialHead({ title, description: summary, slug: metadata.slug })}
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <a class="skip-link" href="#main-content">Skip to content</a>
    <header class="site-header"><div class="shell header-inner"><a class="brand" href="../index.html" aria-label="Photo Skill Path home"><img src="../photo-skill-path-nav-camera.svg" width="32" height="32" alt="" /><span>Photo Skill Path</span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation"><span class="sr-only">Open menu</span><span></span><span></span></button><nav class="primary-nav" id="primary-navigation" aria-label="Primary navigation">${navigation(hub.file)}</nav></div></header>
    <main id="main-content">
      <article class="article-page">
        <header class="article-hero shell">
          <a class="article-back" href="../${hub.file}">← Back to ${hub.label}</a>
          <p class="eyebrow">${categoryLabel[category]} · ${escapeHtml(metadata.style || 'guide')}</p>
          <h1>${escapeHtml(title)}</h1>
          <p class="article-dek">${escapeHtml(summary)}</p>
          <div class="article-meta"><span>For beginners</span><span>Research-backed guide</span></div>
        </header>
        <div class="shell article-body-grid">
          <aside class="article-aside"><p class="eyebrow">Use this guide</p><p>Choose one idea to test, then inspect what changed in the next frame.</p></aside>
          <div>
            <figure class="article-visual${visual.directory === 'article-images' ? ' article-photo' : ''}${visual.visualClass ? ` ${visual.visualClass}` : ''}"><img src="../assets/${visual.directory || 'article-diagrams'}/${visual.file}" alt="${escapeHtml(visual.alt)}" /><figcaption>${escapeHtml(visual.caption || (visual.directory === 'article-images' ? 'Original Photo Skill Path teaching photograph' : 'Original Photo Skill Path learning diagram'))}</figcaption></figure>
            <div class="article-content">${markdownToHtml(sourceMarkdown)}</div>
            ${sourceMarkup}
            ${relatedMarkup}
          </div>
        </div>
      </article>
    </main>
    ${footer()}
    <script src="../script.js"></script>
  </body>
</html>`;
}

const articleDirectories = fs.readdirSync(sourceRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((category) => fs.readdirSync(path.join(sourceRoot, category.name), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(sourceRoot, category.name, entry.name)));

const articles = articleDirectories.map((directory) => {
  const sourceData = JSON.parse(fs.readFileSync(path.join(directory, 'article.json'), 'utf8'));
  const sourceMarkdown = sourceData.body_markdown || fs.readFileSync(path.join(directory, 'article.md'), 'utf8');
  return { metadata: sourceData.metadata, sourceData, sourceMarkdown };
});

fs.mkdirSync(outputRoot, { recursive: true });
for (const article of articles) {
  const related = articles
    .filter((candidate) => candidate.metadata.primary_category === article.metadata.primary_category && candidate.metadata.slug !== article.metadata.slug)
    .sort((a, b) => a.metadata.title.localeCompare(b.metadata.title))
    .slice(0, 3)
    .map((candidate) => candidate.metadata);
  fs.writeFileSync(path.join(outputRoot, `${article.metadata.slug}.html`), buildArticle(article, related));
}

console.log(`Generated ${articles.length} article detail pages in ${outputRoot}`);
