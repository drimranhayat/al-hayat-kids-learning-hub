# Al-Hayat Kids Learning Hub Update Notes

## What Changed

- Replaced the homepage with the improved Claude version in `index.html`.
- Added all pages and folders referenced by the new homepage so navigation does not break.
- Added `site.webmanifest` for basic install/PWA metadata.
- Added `assets/hero-learning-hub.png` for the Open Graph preview image.
- Added shared styling for the supporting pages in `styles.css`.
- Added simple starter versions of quiz, game, subject, library, worksheet, activity, practice, Islamic corner, parent corner, contact, privacy, about, and online class pages.
- Added `videos/index.html` with safe screen-time guidance and connected it from the homepage navigation, activities section, footer, and mobile bottom navigation.
- Added `subjects/index.html` so older Learn links and folder-level subject navigation work.
- Added `parents-corner/screen-time.html` so screen-time guidance links work cleanly.
- Added `data/questions.json` with 3000 structured MCQs across English, Mathematics, Science, Arabic, Islamic Studies, General Knowledge, and Computer Skills.
- Added `data/lessons.json` with 105 age-wise starter lesson records.
- Added `data/worksheets.json` with 105 worksheet/task records.
- Upgraded `quiz.html` into an interactive filtered quiz that reads from the 3000-question bank.
- Added `question-bank/index.html` to search and filter the full question bank.

## Files To Upload

Upload or replace the full contents of this folder into the GitHub repository:

`drimranhayat/al-hayat-kids-learning-hub`

## Important Review Points

- The homepage itself is strong for children: colorful, simple, mobile-friendly, and task-based.
- The local progress feature is safe because it uses browser `localStorage` and does not collect child data.
- Some emoji icons may render differently on different devices. Later, these can be replaced with a consistent icon library.
- The supporting pages are starter pages. They prevent broken links now and can be expanded subject by subject later.

## Verification Performed

- Checked all internal HTML `href` and `src` paths.
- Result: `24 HTML files checked, no missing internal href/src targets.`
- Data result: `3000 questions`, `105 lessons`, `105 worksheets`.
