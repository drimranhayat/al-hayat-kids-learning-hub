/*
  Al-Hayat Kids Learning Hub
  File: assets/progress-tracker.js

  Purpose:
  - Tracks child learning progress safely on the same device/browser.
  - Works on GitHub Pages without backend, login, database, cookies, or personal data.
  - Stores progress only in browser localStorage.
  - Supports stars, streaks, learned items, listen/repeat actions, quiz attempts, and badges.

  Recommended use:
  1. Add this file to:
     assets/progress-tracker.js

  2. Add this line near the end of each page, before </body>:
     <script src="../assets/progress-tracker.js"></script>

  3. For homepage index.html, use:
     <script src="assets/progress-tracker.js"></script>

  Optional button examples:
     <button data-progress-action="learned" data-category="englishWords" data-item-id="eng-001">✅ I learned this</button>
     <button data-progress-action="listen" data-category="englishWords" data-item-id="eng-001">🔊 Listen</button>
     <button data-progress-action="repeat" data-category="englishWords" data-item-id="eng-001">🔁 Repeat</button>
     <button data-progress-action="quiz-correct" data-category="englishWords" data-item-id="eng-001">Correct Answer</button>

  Optional widget:
     <div id="alhayat-progress-widget" data-progress-category="englishWords"></div>
*/

(function () {
  "use strict";

  const STORAGE_KEY = "alhayat_kids_learning_progress_v1";
  const DATE_FORMAT_OPTIONS = { year: "numeric", month: "short", day: "numeric" };

  const ACTION_POINTS = {
    listen: 1,
    repeat: 1,
    learned: 5,
    complete: 7,
    "quiz-correct": 3,
    "quiz-wrong": 0,
    review: 2
  };

  const CATEGORY_LABELS = {
    englishWords: "English Words",
    arabicDaily: "Arabic",
    islamicDaily: "Islamic Studies",
    mathDaily: "Math",
    scienceDaily: "Science",
    gkDaily: "General Knowledge",
    readingDaily: "Reading Library",
    english: "English",
    arabic: "Arabic",
    islamic: "Islamic Studies",
    math: "Math",
    science: "Science",
    generalKnowledge: "General Knowledge",
    reading: "Reading"
  };

  function todayKey(dateInput) {
    const date = dateInput instanceof Date ? dateInput : new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function yesterdayKey() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return todayKey(date);
  }

  function readableDate(dateInput) {
    const date = dateInput instanceof Date ? dateInput : new Date();
    return date.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS);
  }

  function createDefaultState() {
    const now = new Date().toISOString();

    return {
      version: "1.0.0",
      createdAt: now,
      updatedAt: now,
      lastActiveDate: null,
      streak: 0,
      bestStreak: 0,
      totalStars: 0,
      totalActions: 0,
      activities: {},
      daily: {},
      badges: {},
      awarded: {}
    };
  }

  function safeParse(json, fallback) {
    try {
      return JSON.parse(json);
    } catch (error) {
      return fallback;
    }
  }

  function getState() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const state = stored ? safeParse(stored, null) : null;

    if (!state || typeof state !== "object") {
      return createDefaultState();
    }

    return {
      ...createDefaultState(),
      ...state,
      activities: state.activities || {},
      daily: state.daily || {},
      badges: state.badges || {},
      awarded: state.awarded || {}
    };
  }

  function saveState(state) {
    state.updatedAt = new Date().toISOString();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return state;
  }

  function makeActivityKey(category, itemId) {
    return `${category || "general"}:${itemId || "today"}`;
  }

  function ensureActivity(state, category, itemId) {
    const activityKey = makeActivityKey(category, itemId);

    if (!state.activities[activityKey]) {
      state.activities[activityKey] = {
        category: category || "general",
        itemId: itemId || "today",
        firstSeenAt: new Date().toISOString(),
        lastUpdatedAt: null,
        listenCount: 0,
        repeatCount: 0,
        reviewCount: 0,
        quizAttempts: 0,
        quizCorrect: 0,
        quizWrong: 0,
        learned: false,
        completed: false,
        stars: 0,
        actions: []
      };
    }

    return state.activities[activityKey];
  }

  function ensureDaily(state, dateKey) {
    if (!state.daily[dateKey]) {
      state.daily[dateKey] = {
        date: dateKey,
        stars: 0,
        actions: 0,
        learned: 0,
        quizCorrect: 0,
        completedItems: []
      };
    }

    return state.daily[dateKey];
  }

  function updateStreak(state, dateKey) {
    if (state.lastActiveDate === dateKey) {
      return;
    }

    if (state.lastActiveDate === yesterdayKey()) {
      state.streak += 1;
    } else {
      state.streak = 1;
    }

    state.lastActiveDate = dateKey;
    state.bestStreak = Math.max(state.bestStreak || 0, state.streak || 0);
  }

  function getAwardKey(dateKey, category, itemId, action) {
    return `${dateKey}:${category || "general"}:${itemId || "today"}:${action || "action"}`;
  }

  function awardStarsOnce(state, dateKey, category, itemId, action, points) {
    const awardKey = getAwardKey(dateKey, category, itemId, action);
    const safePoints = Number.isFinite(points) ? points : 0;

    if (safePoints <= 0) {
      return 0;
    }

    if (state.awarded[awardKey]) {
      return 0;
    }

    state.awarded[awardKey] = {
      points: safePoints,
      awardedAt: new Date().toISOString()
    };

    state.totalStars += safePoints;
    ensureDaily(state, dateKey).stars += safePoints;

    return safePoints;
  }

  function updateBadges(state) {
    const badges = state.badges || {};
    const totalStars = state.totalStars || 0;
    const streak = state.streak || 0;
    const bestStreak = state.bestStreak || 0;
    const learnedCount = Object.values(state.activities || {}).filter((item) => item.learned).length;
    const completedCount = Object.values(state.activities || {}).filter((item) => item.completed).length;
    const quizCorrect = Object.values(state.activities || {}).reduce((sum, item) => sum + (item.quizCorrect || 0), 0);

    const badgeRules = [
      {
        id: "first-star",
        title: "First Star",
        emoji: "⭐",
        condition: totalStars >= 1,
        message: "You earned your first learning star."
      },
      {
        id: "word-learner",
        title: "Word Learner",
        emoji: "📚",
        condition: learnedCount >= 5,
        message: "You learned 5 items."
      },
      {
        id: "quiz-champion",
        title: "Quiz Champion",
        emoji: "🏆",
        condition: quizCorrect >= 5,
        message: "You answered 5 quiz questions correctly."
      },
      {
        id: "three-day-streak",
        title: "3-Day Streak",
        emoji: "🔥",
        condition: streak >= 3 || bestStreak >= 3,
        message: "You learned for 3 days in a row."
      },
      {
        id: "weekly-explorer",
        title: "Weekly Explorer",
        emoji: "🚀",
        condition: streak >= 7 || bestStreak >= 7,
        message: "You built a 7-day learning streak."
      },
      {
        id: "completion-hero",
        title: "Completion Hero",
        emoji: "🌟",
        condition: completedCount >= 10,
        message: "You completed 10 learning items."
      },
      {
        id: "star-collector",
        title: "Star Collector",
        emoji: "✨",
        condition: totalStars >= 50,
        message: "You collected 50 learning stars."
      }
    ];

    const newlyUnlocked = [];

    badgeRules.forEach((badge) => {
      if (badge.condition && !badges[badge.id]) {
        badges[badge.id] = {
          id: badge.id,
          title: badge.title,
          emoji: badge.emoji,
          message: badge.message,
          unlockedAt: new Date().toISOString()
        };

        newlyUnlocked.push(badges[badge.id]);
      }
    });

    state.badges = badges;
    return newlyUnlocked;
  }

  function markActivity(options) {
    const category = options?.category || "general";
    const itemId = options?.itemId || "today";
    const action = options?.action || "complete";
    const meta = options?.meta || {};
    const dateKey = options?.dateKey || todayKey();
    const points = Number.isFinite(options?.points) ? options.points : (ACTION_POINTS[action] ?? 1);

    const state = getState();
    const daily = ensureDaily(state, dateKey);
    const activity = ensureActivity(state, category, itemId);
    const activityKey = makeActivityKey(category, itemId);
    const now = new Date().toISOString();

    updateStreak(state, dateKey);

    activity.lastUpdatedAt = now;
    activity.actions.push({
      action,
      date: dateKey,
      at: now,
      meta
    });

    if (action === "listen") {
      activity.listenCount += 1;
    }

    if (action === "repeat") {
      activity.repeatCount += 1;
    }

    if (action === "review") {
      activity.reviewCount += 1;
    }

    if (action === "learned") {
      activity.learned = true;
      daily.learned += daily.completedItems.includes(activityKey) ? 0 : 1;
    }

    if (action === "complete") {
      activity.completed = true;
    }

    if (action === "quiz-correct") {
      activity.quizAttempts += 1;
      activity.quizCorrect += 1;
      daily.quizCorrect += 1;
    }

    if (action === "quiz-wrong") {
      activity.quizAttempts += 1;
      activity.quizWrong += 1;
    }

    if ((action === "learned" || action === "complete" || action === "quiz-correct") && !daily.completedItems.includes(activityKey)) {
      daily.completedItems.push(activityKey);
    }

    const awarded = awardStarsOnce(state, dateKey, category, itemId, action, points);
    activity.stars += awarded;

    daily.actions += 1;
    state.totalActions += 1;

    const unlockedBadges = updateBadges(state);
    saveState(state);

    announceProgress({
      action,
      awarded,
      totalStars: state.totalStars,
      streak: state.streak,
      unlockedBadges
    });

    renderAllProgressWidgets();

    return {
      state,
      activity,
      awarded,
      unlockedBadges
    };
  }

  function markListened(category, itemId, meta) {
    return markActivity({ category, itemId, action: "listen", meta });
  }

  function markRepeated(category, itemId, meta) {
    return markActivity({ category, itemId, action: "repeat", meta });
  }

  function markLearned(category, itemId, meta) {
    return markActivity({ category, itemId, action: "learned", meta });
  }

  function markCompleted(category, itemId, meta) {
    return markActivity({ category, itemId, action: "complete", meta });
  }

  function markQuiz(category, itemId, isCorrect, meta) {
    return markActivity({
      category,
      itemId,
      action: isCorrect ? "quiz-correct" : "quiz-wrong",
      meta
    });
  }

  function resetProgress() {
    window.localStorage.removeItem(STORAGE_KEY);
    renderAllProgressWidgets();
    return getState();
  }

  function exportProgress() {
    return JSON.stringify(getState(), null, 2);
  }

  function importProgress(jsonString) {
    const parsed = safeParse(jsonString, null);

    if (!parsed || typeof parsed !== "object") {
      throw new Error("Invalid progress data.");
    }

    saveState({
      ...createDefaultState(),
      ...parsed
    });

    renderAllProgressWidgets();
    return getState();
  }

  function getCategoryStats(category) {
    const state = getState();
    const activities = Object.values(state.activities || {}).filter((item) => item.category === category);
    const learned = activities.filter((item) => item.learned).length;
    const completed = activities.filter((item) => item.completed).length;
    const stars = activities.reduce((sum, item) => sum + (item.stars || 0), 0);
    const quizCorrect = activities.reduce((sum, item) => sum + (item.quizCorrect || 0), 0);
    const quizAttempts = activities.reduce((sum, item) => sum + (item.quizAttempts || 0), 0);
    const totalAvailable = window.AlHayatLearningData?.getCategoryProgressTotal?.(category) || null;

    return {
      category,
      label: CATEGORY_LABELS[category] || category,
      totalAvailable,
      learned,
      completed,
      stars,
      quizCorrect,
      quizAttempts,
      completionPercent: totalAvailable ? Math.min(100, Math.round((learned / totalAvailable) * 100)) : null
    };
  }

  function getOverallStats() {
    const state = getState();
    const activities = Object.values(state.activities || {});
    const learned = activities.filter((item) => item.learned).length;
    const completed = activities.filter((item) => item.completed).length;
    const quizCorrect = activities.reduce((sum, item) => sum + (item.quizCorrect || 0), 0);
    const quizAttempts = activities.reduce((sum, item) => sum + (item.quizAttempts || 0), 0);

    return {
      totalStars: state.totalStars || 0,
      streak: state.streak || 0,
      bestStreak: state.bestStreak || 0,
      learned,
      completed,
      quizCorrect,
      quizAttempts,
      badges: Object.values(state.badges || {}),
      lastActiveDate: state.lastActiveDate || null
    };
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function buildProgressWidgetHtml(category) {
    const overall = getOverallStats();
    const categoryStats = category ? getCategoryStats(category) : null;
    const title = categoryStats ? `${categoryStats.label} Progress` : "Learning Progress";
    const subText = overall.lastActiveDate
      ? `Last active: ${escapeHtml(overall.lastActiveDate)}`
      : "Start today to build your streak.";

    const categoryLine = categoryStats
      ? `
        <div class="alhayat-progress-line">
          <span>📘 ${escapeHtml(categoryStats.label)}</span>
          <strong>${categoryStats.learned}${categoryStats.totalAvailable ? `/${categoryStats.totalAvailable}` : ""} learned</strong>
        </div>
        ${
          categoryStats.completionPercent !== null
            ? `
              <div class="alhayat-progress-bar" aria-label="Category completion">
                <span style="width:${categoryStats.completionPercent}%"></span>
              </div>
            `
            : ""
        }
      `
      : "";

    const badgesHtml = overall.badges.length
      ? overall.badges
          .slice(-4)
          .map((badge) => `<span class="alhayat-badge">${escapeHtml(badge.emoji)} ${escapeHtml(badge.title)}</span>`)
          .join("")
      : `<span class="alhayat-badge">🌱 Start Learning</span>`;

    return `
      <div class="alhayat-progress-card">
        <div class="alhayat-progress-head">
          <div>
            <p class="alhayat-progress-label">Child-safe local progress</p>
            <h3>${escapeHtml(title)}</h3>
            <small>${subText}</small>
          </div>
          <div class="alhayat-progress-stars">⭐ ${overall.totalStars}</div>
        </div>

        <div class="alhayat-progress-grid">
          <div><strong>${overall.streak}</strong><span>Day streak</span></div>
          <div><strong>${overall.learned}</strong><span>Learned</span></div>
          <div><strong>${overall.quizCorrect}</strong><span>Quiz correct</span></div>
          <div><strong>${overall.bestStreak}</strong><span>Best streak</span></div>
        </div>

        ${categoryLine}

        <div class="alhayat-badges">${badgesHtml}</div>

        <p class="alhayat-privacy-note">
          Progress is saved only on this browser/device. No child name, email, or personal data is collected.
        </p>
      </div>
    `;
  }

  function injectProgressStyles() {
    if (document.getElementById("alhayat-progress-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "alhayat-progress-styles";
    style.textContent = `
      .alhayat-progress-card {
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 24px;
        padding: 20px;
        box-shadow: 0 12px 28px rgba(15, 23, 42, 0.07);
        color: #1f2937;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
      }

      .alhayat-progress-head {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: flex-start;
        margin-bottom: 16px;
      }

      .alhayat-progress-label {
        color: #1d4ed8;
        font-weight: 950;
        text-transform: uppercase;
        letter-spacing: 0.10em;
        font-size: 0.72rem;
        margin: 0 0 4px;
      }

      .alhayat-progress-head h3 {
        margin: 0;
        font-size: 1.35rem;
        line-height: 1.15;
        color: #0f172a;
      }

      .alhayat-progress-head small {
        color: #64748b;
        font-weight: 700;
      }

      .alhayat-progress-stars {
        background: #fef3c7;
        border: 1px solid #fde68a;
        color: #92400e;
        border-radius: 999px;
        padding: 9px 12px;
        font-weight: 950;
        white-space: nowrap;
      }

      .alhayat-progress-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-bottom: 14px;
      }

      .alhayat-progress-grid div {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
        padding: 12px;
        text-align: center;
      }

      .alhayat-progress-grid strong {
        display: block;
        color: #1d4ed8;
        font-size: 1.35rem;
        line-height: 1;
      }

      .alhayat-progress-grid span {
        display: block;
        margin-top: 5px;
        color: #64748b;
        font-size: 0.78rem;
        font-weight: 800;
      }

      .alhayat-progress-line {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
        background: #eff6ff;
        border: 1px solid #bfdbfe;
        border-radius: 16px;
        padding: 12px;
        font-weight: 900;
        color: #1e3a8a;
        margin-bottom: 10px;
      }

      .alhayat-progress-bar {
        height: 12px;
        background: #e5e7eb;
        border-radius: 999px;
        overflow: hidden;
        margin-bottom: 12px;
      }

      .alhayat-progress-bar span {
        display: block;
        height: 100%;
        background: linear-gradient(135deg, #2563eb, #38bdf8);
        border-radius: 999px;
      }

      .alhayat-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 12px 0;
      }

      .alhayat-badge {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 999px;
        padding: 8px 10px;
        color: #334155;
        font-weight: 850;
        font-size: 0.85rem;
      }

      .alhayat-privacy-note {
        color: #64748b;
        font-size: 0.82rem;
        font-weight: 700;
        margin: 10px 0 0;
      }

      .alhayat-toast {
        position: fixed;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%) translateY(20px);
        background: #0f172a;
        color: white;
        border-radius: 999px;
        padding: 11px 16px;
        font-weight: 900;
        box-shadow: 0 18px 45px rgba(15, 23, 42, 0.22);
        opacity: 0;
        pointer-events: none;
        transition: 0.22s ease;
        z-index: 9999;
        max-width: min(92vw, 620px);
        text-align: center;
      }

      .alhayat-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      @media (max-width: 700px) {
        .alhayat-progress-head {
          display: block;
        }

        .alhayat-progress-stars {
          display: inline-flex;
          margin-top: 10px;
        }

        .alhayat-progress-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .alhayat-progress-line {
          display: block;
        }

        .alhayat-progress-line strong {
          display: block;
          margin-top: 4px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function renderProgressWidget(element) {
    if (!element) {
      return;
    }

    injectProgressStyles();

    const category = element.dataset.progressCategory || element.getAttribute("data-category") || "";
    element.innerHTML = buildProgressWidgetHtml(category);
  }

  function renderAllProgressWidgets() {
    const widgets = document.querySelectorAll("#alhayat-progress-widget, [data-progress-widget]");
    widgets.forEach(renderProgressWidget);
  }

  function showToast(message) {
    injectProgressStyles();

    let toast = document.getElementById("alhayat-progress-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "alhayat-progress-toast";
      toast.className = "alhayat-toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  function announceProgress(summary) {
    const unlocked = summary.unlockedBadges || [];

    if (unlocked.length > 0) {
      showToast(`${unlocked[0].emoji} Badge unlocked: ${unlocked[0].title}`);
      return;
    }

    if (summary.awarded > 0) {
      showToast(`⭐ +${summary.awarded} stars earned! Total: ${summary.totalStars}`);
    }
  }

  function setupAutoProgressButtons() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-progress-action]");

      if (!button) {
        return;
      }

      const action = button.dataset.progressAction || "complete";
      const category = button.dataset.category || button.dataset.progressCategory || "general";
      const itemId = button.dataset.itemId || button.dataset.progressItemId || "today";
      const points = Number(button.dataset.progressPoints);

      markActivity({
        category,
        itemId,
        action,
        points: Number.isFinite(points) ? points : undefined,
        meta: {
          label: button.textContent.trim()
        }
      });

      if (action === "learned" || action === "complete") {
        button.textContent = "✅ Saved!";
        button.disabled = true;
      }
    });
  }

  function setupResetButtons() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-progress-reset]");

      if (!button) {
        return;
      }

      const confirmed = window.confirm("Reset learning progress on this browser? This cannot be undone.");

      if (confirmed) {
        resetProgress();
        showToast("Progress reset on this browser.");
      }
    });
  }

  window.AlHayatProgressTracker = {
    version: "1.0.0",
    storageKey: STORAGE_KEY,
    todayKey,
    readableDate,
    getState,
    saveState,
    markActivity,
    markListened,
    markRepeated,
    markLearned,
    markCompleted,
    markQuiz,
    resetProgress,
    exportProgress,
    importProgress,
    getCategoryStats,
    getOverallStats,
    renderProgressWidget,
    renderAllProgressWidgets,
    showToast
  };

  document.addEventListener("DOMContentLoaded", () => {
    injectProgressStyles();
    setupAutoProgressButtons();
    setupResetButtons();
    renderAllProgressWidgets();
  });
})();

