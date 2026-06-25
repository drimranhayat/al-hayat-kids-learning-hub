const fs = require('fs');
const path = require('path');

const root = __dirname;
const dataDir = path.join(root, 'data');
fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(path.join(root, 'question-bank'), { recursive: true });

const subjectMeta = {
  english: { name: 'English', icon: '🔤', count: 500, file: 'subjects/english.html' },
  mathematics: { name: 'Mathematics', icon: '🔢', count: 500, file: 'subjects/mathematics.html' },
  science: { name: 'Science', icon: '🔬', count: 400, file: 'subjects/science.html' },
  arabic: { name: 'Arabic', icon: 'أ ب', count: 400, file: 'subjects/arabic.html' },
  islamic: { name: 'Islamic Studies', icon: '🕌', count: 500, file: 'subjects/islamic-studies.html' },
  gk: { name: 'General Knowledge', icon: '🌍', count: 400, file: 'subjects/general-knowledge.html' },
  computer: { name: 'Computer Skills', icon: '💻', count: 300, file: 'subjects/computer-skills.html' },
};

const ages = ['3-4', '5-6', '7-8'];
const questions = [];
const lessons = [];
const worksheets = [];

function pick(arr, i) {
  return arr[i % arr.length];
}

function shuffleOptions(correct, wrongs, seed) {
  const opts = [correct, ...wrongs.filter(w => w !== correct).slice(0, 3)];
  while (opts.length < 4) opts.push(`Choice ${opts.length + 1}`);
  const shift = seed % 4;
  const rotated = opts.slice(shift).concat(opts.slice(0, shift));
  return { options: rotated, answerIndex: rotated.indexOf(correct) };
}

function add(subject, head, age, difficulty, question, correct, wrongs, explanation, skill) {
  const id = `AH-${String(questions.length + 1).padStart(4, '0')}`;
  const packed = shuffleOptions(correct, wrongs, questions.length + subject.length + head.length);
  questions.push({
    id,
    subject,
    subjectName: subjectMeta[subject].name,
    head,
    age,
    difficulty,
    question,
    options: packed.options,
    answerIndex: packed.answerIndex,
    answer: correct,
    explanation,
    skill,
  });
}

function cycleAge(i) {
  return ages[i % ages.length];
}

function difficulty(age, i) {
  if (age === '3-4') return pick(['easy', 'easy', 'gentle'], i);
  if (age === '5-6') return pick(['easy', 'medium', 'medium'], i);
  return pick(['medium', 'medium', 'challenge'], i);
}

const englishWords = [
  ['apple', 'fruit'], ['ball', 'toy'], ['cat', 'animal'], ['dog', 'animal'], ['egg', 'food'],
  ['fish', 'animal'], ['goat', 'animal'], ['hat', 'clothing'], ['ink', 'writing item'], ['jam', 'food'],
  ['kite', 'toy'], ['lamp', 'thing'], ['moon', 'sky object'], ['nest', 'home of a bird'], ['orange', 'fruit'],
  ['pen', 'writing item'], ['queen', 'person'], ['rain', 'weather'], ['sun', 'sky object'], ['tree', 'plant'],
  ['umbrella', 'thing'], ['van', 'vehicle'], ['water', 'drink'], ['box', 'thing'], ['yard', 'place'], ['zebra', 'animal'],
];
const vowels = ['a', 'e', 'i', 'o', 'u'];
const opposites = [['hot', 'cold'], ['big', 'small'], ['up', 'down'], ['day', 'night'], ['happy', 'sad'], ['open', 'closed'], ['fast', 'slow'], ['near', 'far']];
const preps = [['The cat is ___ the box.', 'in'], ['The bird is ___ the tree.', 'on'], ['The ball is ___ the table.', 'under'], ['The child stands ___ the door.', 'near']];

function genEnglish(n) {
  for (let i = 0; i < n; i++) {
    const age = cycleAge(i);
    const d = difficulty(age, i);
    const mode = i % 10;
    const [word, kind] = pick(englishWords, i);
    if (mode === 0) add('english', 'Alphabet', age, d, `Which letter does "${word}" start with?`, word[0].toUpperCase(), ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].filter(x => x !== word[0].toUpperCase()), `"${word}" starts with the sound ${word[0].toUpperCase()}.`, 'letter recognition');
    else if (mode === 1) add('english', 'Vocabulary', age, d, `What is a ${word}?`, kind, ['color', 'number', 'sound', 'place', 'shape'], `A ${word} is a ${kind}.`, 'word meaning');
    else if (mode === 2) add('english', 'Vowels', age, d, `Which one is a vowel?`, pick(vowels, i), ['b', 'c', 'd', 'f', 'g', 'h'], 'The English vowels are a, e, i, o, and u.', 'vowels');
    else if (mode === 3) { const [a, b] = pick(opposites, i); add('english', 'Opposites', age, d, `What is the opposite of "${a}"?`, b, opposites.map(x => x[1]).filter(x => x !== b), `"${b}" is the opposite of "${a}".`, 'opposites'); }
    else if (mode === 4) add('english', 'Plural', age, d, `Choose the plural of "${word}".`, `${word}s`, [`${word}es`, `${word}ing`, `${word}ed`, word], `Most simple words become plural by adding s.`, 'plural nouns');
    else if (mode === 5) { const [sent, ans] = pick(preps, i); add('english', 'Prepositions', age, d, sent, ans, ['at', 'by', 'from', 'with', 'over'].filter(x => x !== ans), `The word "${ans}" fits the sentence.`, 'position words'); }
    else if (mode === 6) add('english', 'Sentence Sense', age, d, `Which sentence is correct?`, `I see a ${word}.`, [`I see an ${word}.`, `I seeing a ${word}.`, `I saws a ${word}.`, `Me see a ${word}.`], `The sentence "I see a ${word}" is simple and correct.`, 'sentence building');
    else if (mode === 7) add('english', 'Rhyming', age, d, `Which word rhymes with "cat"?`, 'hat', ['sun', 'book', 'tree', 'fish'], 'Cat and hat have the same ending sound.', 'rhyming');
    else if (mode === 8) add('english', 'Punctuation', age, d, `Which mark ends a question?`, '?', ['.', ',', '!', ':'], 'A question ends with a question mark.', 'punctuation');
    else add('english', 'Reading', age, d, `Read the word: "${word}". Which picture idea matches it?`, kind, ['letter', 'line', 'question', 'number'], `The word "${word}" names a ${kind}.`, 'reading comprehension');
  }
}

const shapes = ['circle', 'square', 'triangle', 'rectangle'];
function genMath(n) {
  for (let i = 0; i < n; i++) {
    const age = cycleAge(i);
    const d = difficulty(age, i);
    const mode = i % 10;
    const a = (i % 9) + 1;
    const b = ((i * 2) % 8) + 1;
    if (mode === 0) add('mathematics', 'Counting', age, d, `How many stars are here: ${'★ '.repeat((i % 5) + 1).trim()}?`, String((i % 5) + 1), ['1', '2', '3', '4', '5'].filter(x => x !== String((i % 5) + 1)), 'Count each star one by one.', 'counting');
    else if (mode === 1) add('mathematics', 'Addition', age, d, `What is ${a} + ${b}?`, String(a + b), [String(a + b + 1), String(Math.max(0, a + b - 1)), String(a), String(b)], `${a} plus ${b} equals ${a + b}.`, 'addition');
    else if (mode === 2) add('mathematics', 'Subtraction', age, d, `What is ${a + b} - ${b}?`, String(a), [String(b), String(a + 1), String(Math.max(0, a - 1)), String(a + b)], `${a + b} minus ${b} equals ${a}.`, 'subtraction');
    else if (mode === 3) add('mathematics', 'Shapes', age, d, `Which shape has 3 sides?`, 'triangle', ['circle', 'square', 'rectangle', 'oval'], 'A triangle has three sides.', 'shape recognition');
    else if (mode === 4) add('mathematics', 'Shapes', age, d, `Which shape has no corners?`, 'circle', ['square', 'triangle', 'rectangle', 'cube'], 'A circle is round and has no corners.', 'shape properties');
    else if (mode === 5) add('mathematics', 'Comparing', age, d, `Which number is bigger: ${a} or ${b}?`, String(Math.max(a, b)), [String(Math.min(a, b)), String(a + b), '0', '10'].filter(x => x !== String(Math.max(a, b))), 'The bigger number has greater value.', 'comparison');
    else if (mode === 6) add('mathematics', 'Patterns', age, d, 'What comes next: red, blue, red, blue, ___?', 'red', ['blue', 'green', 'yellow', 'black'], 'The pattern repeats red, blue.', 'patterns');
    else if (mode === 7) add('mathematics', 'Number Order', age, d, `What comes after ${a}?`, String(a + 1), [String(a), String(a + 2), String(Math.max(0, a - 1)), String(a + 3)], `The number after ${a} is ${a + 1}.`, 'number order');
    else if (mode === 8) add('mathematics', 'Number Order', age, d, `What comes before ${a + 1}?`, String(a), [String(a + 1), String(a + 2), String(Math.max(0, a - 1)), '0'], `The number before ${a + 1} is ${a}.`, 'number order');
    else add('mathematics', 'Measurement', age, d, `Which object is usually longer?`, 'pencil', ['eraser', 'button', 'coin', 'seed'], 'A pencil is usually longer than the other choices.', 'measurement');
  }
}

const scienceFacts = [
  ['Which animal says moo?', 'cow', ['cat', 'duck', 'goat', 'fish'], 'A cow says moo.', 'Animals'],
  ['What do plants need to grow?', 'water', ['sand only', 'plastic', 'smoke', 'stone'], 'Plants need water, light, and soil to grow.', 'Plants'],
  ['Which part of the body helps us see?', 'eyes', ['ears', 'hands', 'feet', 'nose'], 'We see with our eyes.', 'Body'],
  ['What do we use to hear?', 'ears', ['eyes', 'teeth', 'feet', 'hair'], 'We hear with our ears.', 'Body'],
  ['What weather is wet?', 'rainy', ['sunny', 'dry', 'windless', 'cloudless'], 'Rainy weather brings water from clouds.', 'Weather'],
  ['Which one is a healthy drink?', 'water', ['soda', 'paint', 'oil', 'glue'], 'Water is a healthy drink.', 'Health'],
  ['Where do fish live?', 'water', ['tree', 'nest', 'road', 'sky'], 'Fish live in water.', 'Animals'],
  ['What gives us light in the day?', 'sun', ['moon', 'lamp only', 'shoe', 'book'], 'The sun gives daylight.', 'Sky'],
];
function genScience(n) {
  for (let i = 0; i < n; i++) {
    const age = cycleAge(i);
    const d = difficulty(age, i);
    const [q, ans, wrong, exp, head] = pick(scienceFacts, i);
    add('science', head, age, d, q, ans, wrong, exp, head.toLowerCase());
  }
}

const arabicItems = [
  ['Which Arabic letter is "Alif"?', 'ا', ['ب', 'ت', 'ج', 'د'], 'ا is Alif.', 'Letters'],
  ['Which Arabic letter is "Ba"?', 'ب', ['ا', 'ت', 'ث', 'ح'], 'ب is Ba.', 'Letters'],
  ['What does "salam" mean?', 'peace', ['book', 'water', 'door', 'sun'], 'Salam means peace.', 'Words'],
  ['What does "kitab" mean?', 'book', ['pen', 'house', 'milk', 'star'], 'Kitab means book.', 'Words'],
  ['Arabic is written from which side?', 'right to left', ['left to right', 'top to bottom', 'bottom to top', 'only in circles'], 'Arabic is written from right to left.', 'Writing'],
  ['Which word is used for Allah in Arabic?', 'Allah', ['Bait', 'Qalam', 'Bab', 'Shams'], 'Allah is the Arabic name used for God.', 'Islamic Arabic'],
  ['What does "shukran" mean?', 'thank you', ['good night', 'school', 'red', 'number'], 'Shukran means thank you.', 'Words'],
  ['Which Arabic letter has one dot below?', 'ب', ['ت', 'ث', 'ج', 'خ'], 'Ba has one dot below.', 'Letters'],
];
function genArabic(n) {
  for (let i = 0; i < n; i++) {
    const age = cycleAge(i);
    const d = difficulty(age, i);
    const [q, ans, wrong, exp, head] = pick(arabicItems, i);
    add('arabic', head, age, d, q, ans, wrong, exp, head.toLowerCase());
  }
}

const islamicItems = [
  ['What should we say before eating?', 'Bismillah', ['Alhamdulillah', 'Goodbye', 'Sorry', 'Please'], 'Muslims say Bismillah before eating.', 'Daily Duas'],
  ['What should we say after sneezing?', 'Alhamdulillah', ['Bismillah', 'Subhanallah only', 'Hello', 'No words'], 'Alhamdulillah is said after sneezing.', 'Daily Duas'],
  ['Who is the last Prophet?', 'Prophet Muhammad ﷺ', ['Prophet Nuh عليه السلام', 'Prophet Musa عليه السلام', 'Prophet Isa عليه السلام', 'Prophet Ibrahim عليه السلام'], 'Muslims believe Prophet Muhammad ﷺ is the last Prophet.', 'Prophets'],
  ['How many daily prayers are there?', 'five', ['two', 'three', 'four', 'six'], 'There are five daily prayers.', 'Prayer'],
  ['Which book was revealed to Prophet Muhammad ﷺ?', 'Qur’an', ['Torah', 'Zabur', 'Injil', 'Hadith book'], 'The Qur’an was revealed to Prophet Muhammad ﷺ.', 'Quran'],
  ['Which month do Muslims fast in?', 'Ramadan', ['Shawwal', 'Rajab', 'Safar', 'Muharram'], 'Muslims fast in Ramadan.', 'Fasting'],
  ['What is a good manner?', 'telling the truth', ['lying', 'pushing', 'shouting at parents', 'wasting food'], 'Truthfulness is a good Islamic manner.', 'Manners'],
  ['Which word means praise be to Allah?', 'Alhamdulillah', ['Bismillah', 'Assalamu alaikum', 'JazakAllah', 'Ameen'], 'Alhamdulillah means praise and thanks are for Allah.', 'Daily Words'],
  ['What greeting do Muslims use?', 'Assalamu alaikum', ['Goodbye only', 'No greeting', 'I am here', 'Sit down'], 'Assalamu alaikum is the Muslim greeting of peace.', 'Manners'],
  ['Which place do Muslims face in prayer?', 'Kaaba', ['mountain', 'school', 'garden', 'river'], 'Muslims face the Kaaba during prayer.', 'Prayer'],
];
function genIslamic(n) {
  for (let i = 0; i < n; i++) {
    const age = cycleAge(i);
    const d = difficulty(age, i);
    const [q, ans, wrong, exp, head] = pick(islamicItems, i);
    add('islamic', head, age, d, q, ans, wrong, exp, head.toLowerCase());
  }
}

const gkItems = [
  ['What is the color of grass?', 'green', ['blue', 'red', 'black', 'pink'], 'Grass is usually green.', 'Colors'],
  ['How many days are in a week?', 'seven', ['five', 'six', 'eight', 'ten'], 'There are seven days in a week.', 'Time'],
  ['Where do we go to learn?', 'school', ['hospital', 'market', 'airport', 'farm only'], 'Children go to school to learn.', 'Places'],
  ['Who helps sick people?', 'doctor', ['driver', 'tailor', 'baker', 'farmer'], 'A doctor helps sick people.', 'Community Helpers'],
  ['Which vehicle flies in the sky?', 'airplane', ['car', 'bus', 'bike', 'train'], 'An airplane flies in the sky.', 'Transport'],
  ['What do we wear on our feet?', 'shoes', ['hat', 'gloves', 'shirt', 'belt'], 'Shoes are worn on feet.', 'Clothes'],
  ['Which is the capital of Pakistan?', 'Islamabad', ['Lahore', 'Karachi', 'Multan', 'Quetta'], 'Islamabad is the capital of Pakistan.', 'Pakistan'],
  ['What do we use to tell time?', 'clock', ['plate', 'spoon', 'pillow', 'shoe'], 'A clock tells time.', 'Daily Life'],
];
function genGk(n) {
  for (let i = 0; i < n; i++) {
    const age = cycleAge(i);
    const d = difficulty(age, i);
    const [q, ans, wrong, exp, head] = pick(gkItems, i);
    add('gk', head, age, d, q, ans, wrong, exp, head.toLowerCase());
  }
}

const computerItems = [
  ['Which part shows pictures and words?', 'monitor', ['mouse', 'keyboard', 'chair', 'wire only'], 'The monitor shows pictures and words.', 'Computer Parts'],
  ['Which part helps us type?', 'keyboard', ['mouse', 'speaker', 'screen', 'table'], 'A keyboard is used for typing.', 'Keyboard'],
  ['Which part helps us click?', 'mouse', ['monitor', 'book', 'printer', 'bag'], 'A mouse helps us point and click.', 'Mouse'],
  ['What should we do before using a device?', 'ask a parent', ['hide it', 'click everything', 'share password', 'open random links'], 'Children should ask a parent before using a device.', 'Safety'],
  ['What should we keep private?', 'password', ['color name', 'fruit name', 'shape name', 'day name'], 'Passwords should be kept private.', 'Digital Safety'],
  ['Which key makes a space?', 'spacebar', ['enter', 'shift', 'escape', 'tab'], 'The spacebar makes a space between words.', 'Keyboard'],
];
function genComputer(n) {
  for (let i = 0; i < n; i++) {
    const age = cycleAge(i);
    const d = difficulty(age, i);
    const [q, ans, wrong, exp, head] = pick(computerItems, i);
    add('computer', head, age, d, q, ans, wrong, exp, head.toLowerCase());
  }
}

genEnglish(subjectMeta.english.count);
genMath(subjectMeta.mathematics.count);
genScience(subjectMeta.science.count);
genArabic(subjectMeta.arabic.count);
genIslamic(subjectMeta.islamic.count);
genGk(subjectMeta.gk.count);
genComputer(subjectMeta.computer.count);

const lessonHeads = {
  english: ['Alphabet', 'Phonics', 'Vocabulary', 'Reading', 'Writing'],
  mathematics: ['Counting', 'Shapes', 'Addition', 'Subtraction', 'Patterns'],
  science: ['Animals', 'Plants', 'Body', 'Weather', 'Health'],
  arabic: ['Letters', 'Sounds', 'Words', 'Tracing', 'Writing Direction'],
  islamic: ['Daily Duas', 'Manners', 'Prophets', 'Prayer', 'Quran'],
  gk: ['Colors', 'Time', 'Places', 'Community Helpers', 'Pakistan'],
  computer: ['Computer Parts', 'Mouse', 'Keyboard', 'Safety', 'Digital Manners'],
};

for (const [key, meta] of Object.entries(subjectMeta)) {
  for (const age of ages) {
    lessonHeads[key].forEach((head, i) => {
      lessons.push({
        id: `LES-${key}-${age}-${i + 1}`.replace(/[^A-Za-z0-9-]/g, ''),
        subject: key,
        subjectName: meta.name,
        age,
        title: `${head} for Ages ${age}`,
        objective: `Help children practise ${head.toLowerCase()} through one short parent-guided task.`,
        steps: [
          `Show one clear example related to ${head.toLowerCase()}.`,
          'Ask the child to repeat, point, count, say, trace, or choose.',
          'Finish with one small offline task.',
        ],
        quizLink: `../quiz.html?subject=${key}&age=${age}`,
      });
      worksheets.push({
        id: `WS-${key}-${age}-${i + 1}`.replace(/[^A-Za-z0-9-]/g, ''),
        subject: key,
        subjectName: meta.name,
        age,
        title: `${head} Practice Sheet`,
        task: `Print or copy one ${head.toLowerCase()} activity, then let the child complete it with parent help.`,
        followUp: 'Ask the child to explain one answer aloud.',
      });
    });
  }
}

function writeJson(name, data) {
  fs.writeFileSync(path.join(dataDir, name), JSON.stringify(data, null, 2));
}

writeJson('questions.json', questions);
writeJson('lessons.json', lessons);
writeJson('worksheets.json', worksheets);
writeJson('manifest.json', {
  totalQuestions: questions.length,
  subjects: Object.fromEntries(Object.entries(subjectMeta).map(([k, v]) => [k, { name: v.name, count: v.count }])),
  ages,
  files: ['questions.json', 'lessons.json', 'worksheets.json'],
});

const quizHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mini Quiz | Al-Hayat Kids Learning Hub</title>
  <meta name="description" content="Interactive quiz from a 3000-question child-friendly question bank for ages 3-8.">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <a class="brand" href="index.html"><span class="brand-mark">AH</span><span>Al-Hayat Kids Learning Hub</span></a>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="subjects/index.html">Learn</a>
        <a href="question-bank/index.html">Question Bank</a>
        <a href="game.html">Play</a>
        <a href="parents-corner/index.html">Parent</a>
      </div>
    </nav>
  </header>
  <main class="wrap">
    <section class="hero">
      <span class="eyebrow">3000 Questions • Ages 3-8</span>
      <h1><span aria-hidden="true">❓</span> Mini Quiz</h1>
      <p>Choose a subject and age, then practise one question at a time with instant feedback.</p>
    </section>
    <section class="section">
      <div class="quiz-panel">
        <div class="filters">
          <label>Subject <select id="subjectFilter"><option value="">All Subjects</option></select></label>
          <label>Age <select id="ageFilter"><option value="">All Ages</option><option>3-4</option><option>5-6</option><option>7-8</option></select></label>
          <label>Search <input id="searchBox" type="search" placeholder="word, skill, topic"></label>
          <button class="button" id="newQuestion">New Question</button>
        </div>
        <article class="card quiz-card">
          <p class="eyebrow" id="quizMeta">Loading question bank...</p>
          <h2 id="quizQuestion">Please wait.</h2>
          <div class="options" id="quizOptions"></div>
          <p id="quizFeedback" class="feedback" aria-live="polite"></p>
        </article>
      </div>
    </section>
  </main>
  <footer class="footer"><a href="index.html">Back to Home</a> · <a href="question-bank/index.html">Open Full Question Bank</a></footer>
  <script>
  const subjectNames = ${JSON.stringify(Object.fromEntries(Object.entries(subjectMeta).map(([k, v]) => [k, v.name])))};
  let allQuestions = [], current = null;
  const subjectFilter = document.getElementById('subjectFilter');
  const ageFilter = document.getElementById('ageFilter');
  const searchBox = document.getElementById('searchBox');
  const quizMeta = document.getElementById('quizMeta');
  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizFeedback = document.getElementById('quizFeedback');
  Object.entries(subjectNames).forEach(([key, name]) => subjectFilter.add(new Option(name, key)));
  const params = new URLSearchParams(location.search);
  if (params.get('subject')) subjectFilter.value = params.get('subject');
  if (params.get('age')) ageFilter.value = params.get('age');
  function filtered(){
    const s = subjectFilter.value, a = ageFilter.value, q = searchBox.value.trim().toLowerCase();
    return allQuestions.filter(item => (!s || item.subject === s) && (!a || item.age === a) && (!q || JSON.stringify(item).toLowerCase().includes(q)));
  }
  function showQuestion(){
    const list = filtered();
    if (!list.length){ quizMeta.textContent = 'No question found'; quizQuestion.textContent = 'Try another subject, age, or search word.'; quizOptions.innerHTML = ''; quizFeedback.textContent = ''; return; }
    current = list[Math.floor(Math.random() * list.length)];
    quizMeta.textContent = current.id + ' • ' + current.subjectName + ' • ' + current.head + ' • Ages ' + current.age;
    quizQuestion.textContent = current.question;
    quizOptions.innerHTML = '';
    quizFeedback.textContent = '';
    current.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-button';
      btn.textContent = option;
      btn.addEventListener('click', () => {
        const ok = index === current.answerIndex;
        quizFeedback.textContent = (ok ? 'Correct. ' : 'Good try. Correct answer: ' + current.answer + '. ') + current.explanation;
        quizFeedback.className = 'feedback ' + (ok ? 'correct' : 'wrong');
      });
      quizOptions.appendChild(btn);
    });
  }
  fetch('data/questions.json').then(r => r.json()).then(data => { allQuestions = data; showQuestion(); }).catch(() => { quizMeta.textContent = 'Question bank could not load'; quizQuestion.textContent = 'Check that data/questions.json is uploaded.'; });
  document.getElementById('newQuestion').addEventListener('click', showQuestion);
  subjectFilter.addEventListener('change', showQuestion);
  ageFilter.addEventListener('change', showQuestion);
  searchBox.addEventListener('input', showQuestion);
  </script>
</body>
</html>
`;

const bankHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>3000 Question Bank | Al-Hayat Kids Learning Hub</title>
  <meta name="description" content="Search and filter the 3000-question bank for English, Mathematics, Science, Arabic, Islamic Studies, General Knowledge, and Computer Skills.">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <a class="brand" href="../index.html"><span class="brand-mark">AH</span><span>Al-Hayat Kids Learning Hub</span></a>
      <div class="nav-links">
        <a href="../index.html">Home</a>
        <a href="../subjects/index.html">Learn</a>
        <a href="../quiz.html">Quiz</a>
        <a href="../parents-corner/index.html">Parent</a>
      </div>
    </nav>
  </header>
  <main class="wrap">
    <section class="hero">
      <span class="eyebrow">Full Resource</span>
      <h1>3000 Question Bank</h1>
      <p>Filter by subject, age, topic, difficulty, or keyword. This bank is stored in <code>data/questions.json</code>.</p>
    </section>
    <section class="section">
      <div class="filters">
        <label>Subject <select id="subjectFilter"><option value="">All Subjects</option></select></label>
        <label>Age <select id="ageFilter"><option value="">All Ages</option><option>3-4</option><option>5-6</option><option>7-8</option></select></label>
        <label>Keyword <input id="searchBox" type="search" placeholder="topic, word, skill"></label>
      </div>
      <p class="bank-count" id="countBox">Loading...</p>
      <div class="question-list" id="questionList"></div>
    </section>
  </main>
  <footer class="footer"><a href="../index.html">Back to Home</a> · <a href="../quiz.html">Practise Quiz</a></footer>
  <script>
  const subjectNames = ${JSON.stringify(Object.fromEntries(Object.entries(subjectMeta).map(([k, v]) => [k, v.name])))};
  let allQuestions = [];
  const subjectFilter = document.getElementById('subjectFilter');
  const ageFilter = document.getElementById('ageFilter');
  const searchBox = document.getElementById('searchBox');
  const list = document.getElementById('questionList');
  const countBox = document.getElementById('countBox');
  Object.entries(subjectNames).forEach(([key, name]) => subjectFilter.add(new Option(name, key)));
  function paint(){
    const s = subjectFilter.value, a = ageFilter.value, q = searchBox.value.trim().toLowerCase();
    const result = allQuestions.filter(item => (!s || item.subject === s) && (!a || item.age === a) && (!q || JSON.stringify(item).toLowerCase().includes(q)));
    countBox.textContent = result.length + ' questions shown out of ' + allQuestions.length;
    list.innerHTML = result.slice(0, 120).map(item => '<article class="question-row"><strong>' + item.id + ' • ' + item.subjectName + ' • Ages ' + item.age + '</strong><h3>' + item.question + '</h3><p><b>Answer:</b> ' + item.answer + '</p><p>' + item.explanation + '</p></article>').join('');
    if (result.length > 120) list.insertAdjacentHTML('beforeend', '<p class="bank-count">Showing first 120 results. Use filters to narrow the list.</p>');
  }
  fetch('../data/questions.json').then(r => r.json()).then(data => { allQuestions = data; paint(); }).catch(() => { countBox.textContent = 'Question bank could not load. Check data/questions.json.'; });
  subjectFilter.addEventListener('change', paint);
  ageFilter.addEventListener('change', paint);
  searchBox.addEventListener('input', paint);
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(root, 'quiz.html'), quizHtml);
fs.writeFileSync(path.join(root, 'question-bank', 'index.html'), bankHtml);

const cssAppend = `

/* Question bank and quiz */
.filters{display:flex;gap:12px;flex-wrap:wrap;align-items:end;background:#fff;border-radius:18px;padding:16px;box-shadow:var(--shadow);margin-bottom:18px}
.filters label{display:flex;flex-direction:column;gap:5px;font-weight:800;color:var(--teal-d);font-size:.85rem;flex:1;min-width:160px}
.filters select,.filters input{border:2px solid #dbeeee;border-radius:12px;padding:10px 12px;font:inherit;color:var(--ink);background:#fff}
.quiz-panel{max-width:850px;margin:0 auto}
.quiz-card h2{font-size:1.35rem}
.options{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:16px}
.option-button{border:2px solid #dbeeee;background:#fff;border-radius:14px;padding:13px 14px;text-align:left;font-weight:800;color:var(--ink);cursor:pointer}
.option-button:hover{border-color:#14b8a6;background:#f0faf8}
.feedback{margin-top:14px;font-weight:800;padding:12px 14px;border-radius:14px;background:#f8fafc;color:var(--teal-d)}
.feedback.correct{background:#dcfce7;color:#166534}
.feedback.wrong{background:#fff7ed;color:#9a3412}
.bank-count{font-weight:800;color:var(--teal-d);margin:12px 0}
.question-list{display:grid;gap:12px}
.question-row{background:#fff;border-radius:16px;padding:16px;box-shadow:var(--shadow);border-left:5px solid #14b8a6}
.question-row strong{color:var(--muted);font-size:.82rem}
.question-row h3{color:var(--teal-d);font-size:1.05rem;margin:5px 0}
.question-row p{color:var(--muted);font-size:.92rem}
code{background:#e3f6f1;color:var(--teal-d);border-radius:6px;padding:2px 6px}
`;

const stylesPath = path.join(root, 'styles.css');
let styles = fs.readFileSync(stylesPath, 'utf8');
if (!styles.includes('/* Question bank and quiz */')) {
  styles += cssAppend;
  fs.writeFileSync(stylesPath, styles);
}

console.log(JSON.stringify({
  questions: questions.length,
  lessons: lessons.length,
  worksheets: worksheets.length,
  subjects: Object.fromEntries(Object.entries(subjectMeta).map(([k, v]) => [v.name, v.count])),
}, null, 2));
