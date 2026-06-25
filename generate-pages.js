const fs = require('fs');
const path = require('path');

const root = __dirname;

const subjectPages = [
  ['subjects/english.html', 'English', 'Alphabet, phonics, sight words, reading, writing, and speaking.', '🔤', ['Alphabet recognition', 'Phonics sounds', 'Sight words', 'Picture reading', 'Small writing tasks']],
  ['subjects/mathematics.html', 'Mathematics', 'Counting, shapes, patterns, addition, subtraction, and simple problems.', '🔢', ['Counting 1-100', 'Shapes and patterns', 'Addition practice', 'Subtraction practice', 'Word problems']],
  ['subjects/science.html', 'Science', 'Animals, plants, body parts, weather, water, and healthy habits.', '🔬', ['Animals and habitats', 'Plants and seeds', 'My body', 'Weather', 'Healthy habits']],
  ['subjects/arabic.html', 'Arabic', 'Arabic letters, simple words, recognition, tracing, and matching.', 'أ ب', ['Letter recognition', 'Letter sounds', 'Tracing practice', 'Simple words', 'Matching games']],
  ['subjects/islamic-studies.html', 'Islamic Studies', 'Duas, good manners, prophets, Seerah, prayer basics, and kindness.', '🕌', ['Daily duas', 'Good manners', 'Prophets stories', 'Prayer basics', 'Kindness tasks']],
  ['subjects/general-knowledge.html', 'General Knowledge', 'Myself, family, home, school, country, world, animals, and transport.', '🌍', ['Myself and family', 'Home and school', 'Pakistan', 'Animals', 'Transport']],
  ['subjects/computer-skills.html', 'Computer Skills', 'Computer parts, mouse, keyboard, safe use, typing, and digital manners.', '💻', ['Computer parts', 'Mouse control', 'Keyboard letters', 'Safe use', 'Digital manners']],
];

const sectionPages = [
  ['reading-library/index.html', 'Reading Library', 'Short moral, Islamic, and bedtime stories with gentle parent follow-up questions.', '📖', [
    ['moral', 'Moral Stories', 'Truthfulness, gratitude, helping others, and kindness.'],
    ['islamic', 'Islamic Stories', 'Respectful age-wise stories with clear values.'],
    ['bedtime', 'Bedtime Stories', 'Short calm stories for listening and reading practice.'],
  ]],
  ['worksheets/index.html', 'Worksheets', 'Printable tracing, matching, coloring, counting, and writing practice.', '🖨️', [
    ['tracing', 'Tracing', 'Letters, numbers, shapes, and Arabic letters.'],
    ['matching', 'Matching', 'Picture-word and object-number activities.'],
    ['writing', 'Writing', 'Short guided writing practice for ages 5-8.'],
  ]],
  ['activities/index.html', 'Activities', 'Tap, match, sort, and solve simple learning tasks.', '🧩', [
    ['matching', 'Matching Games', 'Match pictures, letters, numbers, and meanings.'],
    ['sorting', 'Sorting', 'Sort by shape, color, category, and value.'],
    ['memory', 'Memory Practice', 'Quick recall games for words and numbers.'],
  ]],
  ['practice/index.html', 'Practice', 'Simple whiteboard-style practice for letters, numbers, typing, and tracing.', '✍️', [
    ['typing', 'Typing', 'Type letters and short words.'],
    ['tracing', 'Tracing', 'Trace letters and numbers with parent guidance.'],
    ['review', 'Daily Review', 'Repeat one small task daily.'],
  ]],
  ['islamic-corner/index.html', 'Islamic Corner', 'Faith, manners, duas, prophets, and daily Islamic habits for children.', '🌙', [
    ['duas', 'Daily Duas', 'Common duas with Arabic and simple meanings.'],
    ['manners', 'Good Manners', 'Truthfulness, kindness, respect, and cleanliness.'],
    ['prophets', 'Prophets', 'Age-wise stories and lessons.'],
    ['names', 'Asma ul Husna', 'Beautiful names introduced gently.'],
  ]],
  ['parents-corner/index.html', 'Parents Corner', 'Guidance for safe, simple, parent-led learning at home.', '👪', [
    ['daily-plan', 'Daily Plan', 'Use five short tasks instead of long screen sessions.'],
    ['progress', 'Progress', 'Track stars and completed activities in the browser.'],
    ['certificate', 'Certificate', 'Print a simple certificate after weekly progress.'],
  ]],
];

const simplePages = [
  ['quiz.html', 'Mini Quiz', 'Short questions with instant feedback.', '❓'],
  ['game.html', 'Star Quest', 'A light Islamic learning adventure for children.', '🌟'],
  ['online-classes.html', 'Online Classes', 'Parent-guided online learning information.', '🎥'],
  ['about.html', 'About', 'Al-Hayat Kids Learning Hub supports safe Islamic and academic learning for ages 3-8.', '🌱'],
  ['contact.html', 'Contact', 'Use this page to add your contact form, WhatsApp link, or email details.', '✉️'],
  ['privacy.html', 'Privacy', 'No child login is required. Progress is stored locally in the browser only.', '🔒'],
];

const css = `:root{--teal:#0f766e;--teal-d:#0c5d56;--amber:#f59e0b;--green:#16a34a;--ink:#1f2937;--muted:#64748b;--bg:#f3fbf9;--card:#fff;--shadow:0 8px 24px rgba(15,118,110,.10)}*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',system-ui,-apple-system,Roboto,sans-serif;color:var(--ink);line-height:1.6;background:linear-gradient(180deg,#d7f3ee 0%,var(--bg) 32%,#fffaf0 100%);min-height:100vh}a{text-decoration:none;color:inherit}.wrap{max-width:1040px;margin:0 auto;padding:0 18px}.site-header{position:sticky;top:0;background:rgba(255,255,255,.94);backdrop-filter:blur(10px);box-shadow:0 2px 14px rgba(0,0,0,.05);z-index:20}.nav{max-width:1040px;margin:0 auto;padding:12px 18px;display:flex;gap:14px;align-items:center}.brand{display:flex;align-items:center;gap:10px;font-weight:800;color:var(--teal-d)}.brand-mark{width:42px;height:42px;border-radius:13px;background:linear-gradient(135deg,var(--teal),#14b8a6);display:grid;place-items:center;color:#fff}.nav-links{margin-left:auto;display:flex;gap:6px;flex-wrap:wrap}.nav-links a{padding:8px 12px;border-radius:999px;font-weight:700;color:var(--muted);font-size:.9rem}.nav-links a:hover{background:#e3f6f1;color:var(--teal-d)}.hero{padding:48px 0 30px;text-align:center}.eyebrow{display:inline-block;background:#e3f6f1;color:var(--teal-d);font-weight:800;font-size:.78rem;padding:6px 14px;border-radius:999px}.hero h1{font-size:2.25rem;color:var(--teal-d);margin:14px 0 8px}.hero p{max-width:650px;margin:0 auto;color:var(--muted);font-size:1.05rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:28px 0 40px}.card{background:var(--card);border-radius:22px;padding:22px;box-shadow:var(--shadow);border:2px solid transparent}.card:hover{border-color:#bfe9e1;transform:translateY(-3px)}.icon{font-size:2.2rem;display:inline-block;margin-bottom:8px}.card h2,.card h3{color:var(--teal-d);font-size:1.15rem;margin-bottom:6px}.card p{color:var(--muted);font-size:.94rem}.button{display:inline-flex;align-items:center;justify-content:center;margin-top:14px;padding:11px 18px;border-radius:999px;background:linear-gradient(90deg,var(--teal),var(--teal-d));color:#fff;font-weight:800}.section{padding:8px 0 36px}.footer{background:var(--teal-d);color:#cdeee8;text-align:center;padding:24px 18px;margin-top:18px}.footer a{color:#fff;font-weight:800}@media(max-width:700px){.nav{align-items:flex-start;flex-direction:column}.nav-links{margin-left:0}.hero h1{font-size:1.85rem}}`;

function write(file, content) {
  const out = path.join(root, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, content);
}

function shell(title, desc, icon, body, prefix = '') {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | Al-Hayat Kids Learning Hub</title>
  <meta name="description" content="${desc}">
  <link rel="stylesheet" href="${prefix}styles.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <a class="brand" href="${prefix}index.html"><span class="brand-mark">AH</span><span>Al-Hayat Kids Learning Hub</span></a>
      <div class="nav-links">
        <a href="${prefix}index.html">Home</a>
        <a href="${prefix}quiz.html">Quiz</a>
        <a href="${prefix}game.html">Play</a>
      </div>
    </nav>
  </header>
  <main class="wrap">
    <section class="hero">
      <span class="eyebrow">Ages 3-8</span>
      <h1><span aria-hidden="true">${icon}</span> ${title}</h1>
      <p>${desc}</p>
    </section>
    ${body}
  </main>
  <footer class="footer"><a href="${prefix}index.html">Back to Home</a> · Safe · Ad-free · Parent-guided</footer>
</body>
</html>
`;
}

write('styles.css', css);
write('site.webmanifest', JSON.stringify({
  name: 'Al-Hayat Kids Learning Hub',
  short_name: 'Al-Hayat Kids',
  start_url: './index.html',
  display: 'standalone',
  background_color: '#f3fbf9',
  theme_color: '#0f766e',
  description: 'Safe Islamic and academic learning for ages 3-8.'
}, null, 2));

for (const [file, title, desc, icon, topics] of subjectPages) {
  const body = `<section class="section"><div class="grid">${topics.map((t, i) => `<article class="card"><span class="icon" aria-hidden="true">${i + 1}</span><h2>${t}</h2><p>Short child-friendly lessons and practice tasks can be added here.</p><a class="button" href="../quiz.html">Try Quiz</a></article>`).join('')}</div></section>`;
  write(file, shell(title, desc, icon, body, '../'));
}

for (const [file, title, desc, icon, cards] of sectionPages) {
  const body = `<section class="section"><div class="grid">${cards.map(([id, h, p]) => `<article class="card" id="${id}"><span class="icon" aria-hidden="true">${icon}</span><h2>${h}</h2><p>${p}</p></article>`).join('')}</div></section>`;
  write(file, shell(title, desc, icon, body, '../'));
}

for (const [file, title, desc, icon] of simplePages) {
  let body = `<section class="section"><div class="grid"><article class="card"><span class="icon" aria-hidden="true">${icon}</span><h2>${title}</h2><p>${desc}</p><a class="button" href="index.html">Return Home</a></article></div></section>`;
  if (file === 'quiz.html') {
    body = `<section class="section"><div class="grid"><article class="card"><span class="icon" aria-hidden="true">❓</span><h2>Quick Question</h2><p id="quiz-question">What should we say before eating?</p><button class="button" onclick="document.getElementById('quiz-answer').textContent='Bismillah. Well done!'">Show Answer</button><p id="quiz-answer" style="margin-top:12px;color:#0c5d56;font-weight:800"></p></article></div></section>`;
  }
  if (file === 'game.html') {
    body = `<section class="section"><div class="grid"><article class="card"><span class="icon" aria-hidden="true">🌟</span><h2>Star Quest</h2><p>Tap the button to collect a practice star.</p><button class="button" onclick="var n=document.getElementById('stars');n.textContent=Number(n.textContent)+1">Collect Star</button><p style="margin-top:12px">Stars: <strong id="stars">0</strong></p></article></div></section>`;
  }
  write(file, shell(title, desc, icon, body));
}
