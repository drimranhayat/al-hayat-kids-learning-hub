/*
  Al-Hayat Kids Learning Hub
  File: assets/learning-data.js

  Purpose:
  - Stores daily learning banks for all subjects.
  - Changes content automatically by date.
  - Supports Word of the Day, Arabic Letter/Word, Dua/Value, Math Problem,
    Science Fact, GK Fact, and Reading Practice.
  - Works on GitHub Pages without database or backend.
  - Does not collect personal data.

  Next file to add:
  - assets/progress-tracker.js
*/

(function () {
  "use strict";

  const BASE_DATE = new Date("2026-01-01T00:00:00");

  const DATA = {
    englishWords: [
      {
        id: "eng-001",
        level: "Beginner",
        word: "brave",
        type: "adjective",
        emoji: "🦁",
        meaning: "ready to do the right thing even when it feels difficult",
        sentence: "The brave child told the truth.",
        visualClue: "Think of a child standing tall and telling the truth.",
        miniTask: "Use brave in your own sentence.",
        quiz: {
          question: "What does brave mean?",
          options: ["afraid to try", "ready to do the right thing", "very sleepy"],
          answer: "ready to do the right thing"
        }
      },
      {
        id: "eng-002",
        level: "Beginner",
        word: "kind",
        type: "adjective",
        emoji: "💛",
        meaning: "gentle, caring, and helpful to others",
        sentence: "A kind girl shared her lunch with her friend.",
        visualClue: "Picture a child helping someone with a smile.",
        miniTask: "Say one kind thing you can do today.",
        quiz: {
          question: "Which action is kind?",
          options: ["sharing with a friend", "pushing someone", "breaking a toy"],
          answer: "sharing with a friend"
        }
      },
      {
        id: "eng-003",
        level: "Beginner",
        word: "honest",
        type: "adjective",
        emoji: "🤝",
        meaning: "truthful and not cheating or lying",
        sentence: "An honest boy returned the lost pencil.",
        visualClue: "Imagine someone finding something and returning it.",
        miniTask: "Use honest in a sentence about school or home.",
        quiz: {
          question: "An honest person usually...",
          options: ["tells the truth", "hides the truth", "takes things secretly"],
          answer: "tells the truth"
        }
      },
      {
        id: "eng-004",
        level: "Beginner",
        word: "curious",
        type: "adjective",
        emoji: "🔎",
        meaning: "wanting to learn or know more",
        sentence: "The curious child asked many good questions.",
        visualClue: "Think of a child looking closely and asking why.",
        miniTask: "Ask one curious question about something near you.",
        quiz: {
          question: "A curious child likes to...",
          options: ["ask questions", "never learn", "ignore everything"],
          answer: "ask questions"
        }
      },
      {
        id: "eng-005",
        level: "Beginner",
        word: "gentle",
        type: "adjective",
        emoji: "🕊️",
        meaning: "soft, calm, and careful in action",
        sentence: "Be gentle when you hold the baby bird.",
        visualClue: "Imagine careful hands touching something softly.",
        miniTask: "Say gentle and show a gentle action.",
        quiz: {
          question: "Gentle means...",
          options: ["rough and loud", "soft and careful", "angry and fast"],
          answer: "soft and careful"
        }
      },
      {
        id: "eng-006",
        level: "Beginner",
        word: "patient",
        type: "adjective",
        emoji: "⏳",
        meaning: "able to wait calmly without getting upset",
        sentence: "The patient boy waited for his turn.",
        visualClue: "Picture a child sitting calmly in a line.",
        miniTask: "Tell when you had to wait patiently.",
        quiz: {
          question: "A patient person can...",
          options: ["wait calmly", "shout quickly", "run away"],
          answer: "wait calmly"
        }
      },
      {
        id: "eng-007",
        level: "Beginner",
        word: "helpful",
        type: "adjective",
        emoji: "🧹",
        meaning: "willing to help others",
        sentence: "My helpful sister cleaned the table.",
        visualClue: "Think of hands helping with a small task.",
        miniTask: "Name one helpful job you can do at home.",
        quiz: {
          question: "Which person is helpful?",
          options: ["someone who helps clean", "someone who makes a mess", "someone who laughs at others"],
          answer: "someone who helps clean"
        }
      },
      {
        id: "eng-008",
        level: "Beginner",
        word: "careful",
        type: "adjective",
        emoji: "🚶",
        meaning: "doing things with attention to avoid mistakes or harm",
        sentence: "Be careful when you carry a glass of water.",
        visualClue: "Imagine walking slowly with something easy to spill.",
        miniTask: "Show one careful action with your hands.",
        quiz: {
          question: "Careful means...",
          options: ["doing things with attention", "throwing things around", "not thinking"],
          answer: "doing things with attention"
        }
      },
      {
        id: "eng-009",
        level: "Beginner",
        word: "cheerful",
        type: "adjective",
        emoji: "😊",
        meaning: "happy and bright in mood",
        sentence: "Her cheerful smile made everyone happy.",
        visualClue: "Think of a smiling face brightening the room.",
        miniTask: "Say cheerful with a smile.",
        quiz: {
          question: "A cheerful person is usually...",
          options: ["happy", "very angry", "careless"],
          answer: "happy"
        }
      },
      {
        id: "eng-010",
        level: "Beginner",
        word: "thankful",
        type: "adjective",
        emoji: "🙏",
        meaning: "feeling grateful for kindness or blessings",
        sentence: "We are thankful for our family and home.",
        visualClue: "Picture a child saying thank you with a happy heart.",
        miniTask: "Say one thing you are thankful for today.",
        quiz: {
          question: "Thankful means...",
          options: ["grateful", "forgetful", "rude"],
          answer: "grateful"
        }
      },
      {
        id: "eng-011",
        level: "Beginner",
        word: "neat",
        type: "adjective",
        emoji: "📚",
        meaning: "clean, tidy, and well arranged",
        sentence: "Her notebook is neat and easy to read.",
        visualClue: "Imagine books and pencils arranged nicely.",
        miniTask: "Make one small area near you neat.",
        quiz: {
          question: "A neat room is...",
          options: ["tidy", "dirty", "broken"],
          answer: "tidy"
        }
      },
      {
        id: "eng-012",
        level: "Beginner",
        word: "polite",
        type: "adjective",
        emoji: "🙂",
        meaning: "showing good manners and respect",
        sentence: "The polite child said please and thank you.",
        visualClue: "Think of a child greeting others kindly.",
        miniTask: "Use polite in a sentence with please or thank you.",
        quiz: {
          question: "A polite child says...",
          options: ["please and thank you", "bad words", "nothing kind"],
          answer: "please and thank you"
        }
      },
      {
        id: "eng-013",
        level: "Beginner",
        word: "creative",
        type: "adjective",
        emoji: "🎨",
        meaning: "good at making new ideas, art, or solutions",
        sentence: "The creative child made a castle from boxes.",
        visualClue: "Picture paints, blocks, and a child building something new.",
        miniTask: "Name one creative thing you want to make.",
        quiz: {
          question: "A creative child can...",
          options: ["make new ideas", "never think", "only copy mistakes"],
          answer: "make new ideas"
        }
      },
      {
        id: "eng-014",
        level: "Beginner",
        word: "active",
        type: "adjective",
        emoji: "🏃",
        meaning: "moving, energetic, and ready to do things",
        sentence: "The active boy enjoyed running in the park.",
        visualClue: "Imagine a child jumping, running, or playing outside.",
        miniTask: "Tell one active game you like to play.",
        quiz: {
          question: "Active means...",
          options: ["energetic", "always sleeping", "never moving"],
          answer: "energetic"
        }
      },
      {
        id: "eng-015",
        level: "Beginner",
        word: "calm",
        type: "adjective",
        emoji: "🌿",
        meaning: "peaceful and not angry or worried",
        sentence: "The calm child spoke softly.",
        visualClue: "Think of quiet breathing and a peaceful face.",
        miniTask: "Take one calm breath and say the word.",
        quiz: {
          question: "Calm means...",
          options: ["peaceful", "angry", "noisy"],
          answer: "peaceful"
        }
      },
      {
        id: "eng-016",
        level: "Beginner",
        word: "bright",
        type: "adjective",
        emoji: "☀️",
        meaning: "full of light or clever and lively",
        sentence: "The bright sun shone in the sky.",
        visualClue: "Picture the morning sun shining brightly.",
        miniTask: "Use bright for the sun or a clever idea.",
        quiz: {
          question: "Which thing can be bright?",
          options: ["the sun", "a dark box", "a silent wall"],
          answer: "the sun"
        }
      },
      {
        id: "eng-017",
        level: "Beginner",
        word: "clean",
        type: "adjective",
        emoji: "🧼",
        meaning: "not dirty",
        sentence: "Wash your hands to keep them clean.",
        visualClue: "Imagine hands washed with soap and water.",
        miniTask: "Name one thing you should keep clean.",
        quiz: {
          question: "Clean means...",
          options: ["not dirty", "broken", "lost"],
          answer: "not dirty"
        }
      },
      {
        id: "eng-018",
        level: "Beginner",
        word: "quick",
        type: "adjective",
        emoji: "⚡",
        meaning: "fast or taking little time",
        sentence: "The quick rabbit ran across the grass.",
        visualClue: "Think of something moving very fast.",
        miniTask: "Say one animal that can be quick.",
        quiz: {
          question: "Quick means...",
          options: ["fast", "slow", "sleepy"],
          answer: "fast"
        }
      },
      {
        id: "eng-019",
        level: "Beginner",
        word: "strong",
        type: "adjective",
        emoji: "💪",
        meaning: "having power or firmness",
        sentence: "The strong tree did not fall in the wind.",
        visualClue: "Picture a tree standing firm in the wind.",
        miniTask: "Use strong in a sentence.",
        quiz: {
          question: "Strong means...",
          options: ["powerful", "weak", "empty"],
          answer: "powerful"
        }
      },
      {
        id: "eng-020",
        level: "Beginner",
        word: "wise",
        type: "adjective",
        emoji: "🦉",
        meaning: "able to make good choices",
        sentence: "The wise child listened before speaking.",
        visualClue: "Think of someone making a thoughtful choice.",
        miniTask: "Name one wise choice for school.",
        quiz: {
          question: "A wise choice is usually...",
          options: ["a good choice", "a careless choice", "a noisy choice"],
          answer: "a good choice"
        }
      }
    ],

    arabicDaily: [
      {
        id: "ar-001",
        letter: "ا",
        name: "Alif",
        soundHint: "long aa sound",
        word: "أَسَد",
        transliteration: "asad",
        meaning: "lion",
        emoji: "🦁",
        miniTask: "Trace Alif three times and say asad.",
        audioText: "ألف. أَسَد"
      },
      {
        id: "ar-002",
        letter: "ب",
        name: "Baa",
        soundHint: "b sound",
        word: "بَيْت",
        transliteration: "bayt",
        meaning: "house",
        emoji: "🏠",
        miniTask: "Trace Baa three times and say bayt.",
        audioText: "باء. بَيْت"
      },
      {
        id: "ar-003",
        letter: "ت",
        name: "Taa",
        soundHint: "t sound",
        word: "تَمْر",
        transliteration: "tamr",
        meaning: "dates",
        emoji: "🌴",
        miniTask: "Trace Taa three times and say tamr.",
        audioText: "تاء. تَمْر"
      },
      {
        id: "ar-004",
        letter: "ث",
        name: "Thaa",
        soundHint: "th sound",
        word: "ثَوْب",
        transliteration: "thawb",
        meaning: "garment",
        emoji: "👕",
        miniTask: "Trace Thaa carefully.",
        audioText: "ثاء. ثَوْب"
      },
      {
        id: "ar-005",
        letter: "ج",
        name: "Jeem",
        soundHint: "j sound",
        word: "جَمَل",
        transliteration: "jamal",
        meaning: "camel",
        emoji: "🐪",
        miniTask: "Say Jeem and draw a camel.",
        audioText: "جيم. جَمَل"
      },
      {
        id: "ar-006",
        letter: "ح",
        name: "Haa",
        soundHint: "deep h sound",
        word: "حُبّ",
        transliteration: "hubb",
        meaning: "love",
        emoji: "💚",
        miniTask: "Say Haa softly and carefully.",
        audioText: "حاء. حُبّ"
      },
      {
        id: "ar-007",
        letter: "خ",
        name: "Khaa",
        soundHint: "kh sound",
        word: "خُبْز",
        transliteration: "khubz",
        meaning: "bread",
        emoji: "🍞",
        miniTask: "Say Khaa and identify the dot position.",
        audioText: "خاء. خُبْز"
      }
    ],

    islamicDaily: [
      {
        id: "isl-001",
        title: "Before eating",
        arabic: "بِسْمِ اللّٰهِ",
        transliteration: "Bismillah",
        meaning: "In the name of Allah.",
        value: "Remember Allah before starting good things.",
        emoji: "🍽️",
        miniTask: "Say Bismillah before eating today.",
        audioLang: "ar-SA"
      },
      {
        id: "isl-002",
        title: "After eating",
        arabic: "الْحَمْدُ لِلّٰهِ",
        transliteration: "Alhamdulillah",
        meaning: "All praise is for Allah.",
        value: "Be thankful for food and blessings.",
        emoji: "🙏",
        miniTask: "Say Alhamdulillah after eating.",
        audioLang: "ar-SA"
      },
      {
        id: "isl-003",
        title: "Greeting",
        arabic: "السَّلَامُ عَلَيْكُمْ",
        transliteration: "Assalamu Alaikum",
        meaning: "Peace be upon you.",
        value: "Greet others with peace and kindness.",
        emoji: "🤝",
        miniTask: "Greet someone politely today.",
        audioLang: "ar-SA"
      },
      {
        id: "isl-004",
        title: "Value of the Day",
        arabic: "",
        transliteration: "Sidq",
        meaning: "Truthfulness.",
        value: "A truthful person is trusted by others.",
        emoji: "🌟",
        miniTask: "Tell the truth even if it feels difficult.",
        audioLang: "en-US"
      },
      {
        id: "isl-005",
        title: "Good Manners",
        arabic: "",
        transliteration: "Kindness",
        meaning: "Being gentle and helpful.",
        value: "Islam teaches kindness to family, friends, animals, and all creation.",
        emoji: "💚",
        miniTask: "Do one kind action today.",
        audioLang: "en-US"
      }
    ],

    mathDaily: [
      {
        id: "math-001",
        level: "Beginner",
        topic: "Addition",
        emoji: "➕",
        question: "4 + 3 = ?",
        answer: "7",
        explanation: "Start at 4 and count three more: 5, 6, 7.",
        visualClue: "Imagine 4 apples and 3 more apples.",
        miniTask: "Use fingers or dots to show 4 plus 3."
      },
      {
        id: "math-002",
        level: "Beginner",
        topic: "Subtraction",
        emoji: "➖",
        question: "9 - 2 = ?",
        answer: "7",
        explanation: "Start with 9 and take away 2. You have 7 left.",
        visualClue: "Imagine 9 pencils and 2 are taken away.",
        miniTask: "Draw 9 circles and cross out 2."
      },
      {
        id: "math-003",
        level: "Beginner",
        topic: "Shapes",
        emoji: "🔺",
        question: "How many sides does a triangle have?",
        answer: "3",
        explanation: "A triangle has 3 sides and 3 corners.",
        visualClue: "Look for a shape like a slice of pizza.",
        miniTask: "Draw one triangle."
      },
      {
        id: "math-004",
        level: "Beginner",
        topic: "Counting",
        emoji: "🔢",
        question: "What number comes after 12?",
        answer: "13",
        explanation: "When we count forward, 13 comes after 12.",
        visualClue: "Say 10, 11, 12, 13.",
        miniTask: "Count from 1 to 13 aloud."
      },
      {
        id: "math-005",
        level: "Beginner",
        topic: "Comparison",
        emoji: "⚖️",
        question: "Which is bigger: 8 or 5?",
        answer: "8",
        explanation: "8 is bigger because it is more than 5.",
        visualClue: "Imagine 8 blocks and 5 blocks.",
        miniTask: "Make two groups and compare them."
      }
    ],

    scienceDaily: [
      {
        id: "sci-001",
        topic: "Plants",
        emoji: "🌱",
        fact: "Most plants need water, sunlight, air, and nutrients to grow.",
        question: "What do plants need to grow?",
        answer: "Water, sunlight, air, and nutrients.",
        observation: "Look at a plant and find its stem and leaves.",
        miniTask: "Draw a plant and label leaf, stem, and root."
      },
      {
        id: "sci-002",
        topic: "Earth",
        emoji: "🌍",
        fact: "Earth rotates, and this helps create day and night.",
        question: "What does Earth’s rotation help create?",
        answer: "Day and night.",
        observation: "Notice the sky in the morning and evening.",
        miniTask: "Draw day on one side and night on the other."
      },
      {
        id: "sci-003",
        topic: "Water",
        emoji: "💧",
        fact: "Water can change into ice when it becomes very cold.",
        question: "What can water become when it freezes?",
        answer: "Ice.",
        observation: "Look at ice and water. How are they different?",
        miniTask: "Describe ice using three words."
      },
      {
        id: "sci-004",
        topic: "Animals",
        emoji: "🐾",
        fact: "Animals live in different habitats such as forests, deserts, oceans, and homes.",
        question: "What is a habitat?",
        answer: "A place where an animal lives.",
        observation: "Choose one animal and think about where it lives.",
        miniTask: "Draw an animal in its habitat."
      },
      {
        id: "sci-005",
        topic: "Weather",
        emoji: "🌦️",
        fact: "Weather can be sunny, cloudy, rainy, windy, hot, or cold.",
        question: "What is today’s weather like?",
        answer: "Observe and describe it.",
        observation: "Look outside and describe the sky.",
        miniTask: "Draw today’s weather."
      }
    ],

    gkDaily: [
      {
        id: "gk-001",
        topic: "Maps",
        emoji: "🗺️",
        fact: "A map helps us find places, directions, roads, rivers, and countries.",
        question: "What does a map help us do?",
        answer: "Find places and directions.",
        miniTask: "Find your country on a map."
      },
      {
        id: "gk-002",
        topic: "Compass",
        emoji: "🧭",
        fact: "A compass shows directions such as north, south, east, and west.",
        question: "Which direction is usually shown at the top of a compass?",
        answer: "North.",
        miniTask: "Say north, south, east, and west."
      },
      {
        id: "gk-003",
        topic: "Continents",
        emoji: "🌍",
        fact: "Many schools teach seven continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia/Oceania.",
        question: "Which continent is the largest?",
        answer: "Asia.",
        miniTask: "Say the names of three continents."
      },
      {
        id: "gk-004",
        topic: "Inventions",
        emoji: "💡",
        fact: "The wheel is one of the most important inventions because it helped people move things more easily.",
        question: "Why is the wheel useful?",
        answer: "It helps people move things more easily.",
        miniTask: "Name one thing that uses wheels."
      },
      {
        id: "gk-005",
        topic: "Culture",
        emoji: "🤝",
        fact: "People around the world speak different languages, eat different foods, and wear different clothes.",
        question: "How should we treat people from different cultures?",
        answer: "With respect and kindness.",
        miniTask: "Learn one greeting from another language."
      }
    ],

    readingDaily: [
      {
        id: "read-001",
        title: "The Honest Boy",
        emoji: "📖",
        level: "Easy",
        value: "Honesty",
        passage: "Hamza found a wallet near the school gate. He wanted to help, so he gave it to his teacher. The owner was happy, and Hamza felt peaceful because he did the right thing.",
        word: "honest",
        meaning: "truthful and not cheating or lying",
        question: "What did Hamza do with the wallet?",
        answer: "He gave it to his teacher.",
        miniTask: "Tell one honest action you can do."
      },
      {
        id: "read-002",
        title: "The Little Garden",
        emoji: "🌱",
        level: "Easy",
        value: "Care",
        passage: "Sara watered her small garden every morning. One plant looked dry, so she gave it water and sunlight. After a few days, the plant looked fresh again.",
        word: "care",
        meaning: "attention and kindness given to someone or something",
        question: "How did Sara help the dry plant?",
        answer: "She gave it water and sunlight.",
        miniTask: "Draw a plant and write one care sentence."
      },
      {
        id: "read-003",
        title: "A Kind Friend",
        emoji: "💛",
        level: "Easy",
        value: "Kindness",
        passage: "Amina saw her friend looking sad. She sat beside her, listened carefully, and shared kind words. Her friend smiled again.",
        word: "kind",
        meaning: "gentle, caring, and helpful",
        question: "How did Amina help her friend?",
        answer: "She listened and spoke kindly.",
        miniTask: "Say one kind sentence to someone."
      }
    ]
  };

  function normalizeDate(dateInput) {
    if (dateInput instanceof Date && !Number.isNaN(dateInput.getTime())) {
      return dateInput;
    }

    const parsedDate = new Date(dateInput);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate;
    }

    return new Date();
  }

  function getDayNumber(dateInput) {
    const date = normalizeDate(dateInput);
    const current = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const base = new Date(BASE_DATE.getFullYear(), BASE_DATE.getMonth(), BASE_DATE.getDate());
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.max(0, Math.floor((current - base) / oneDay));
  }

  function getDailyItem(categoryName, dateInput, offset) {
    const category = DATA[categoryName];

    if (!Array.isArray(category) || category.length === 0) {
      console.warn(`Al-Hayat Learning Data: category not found or empty: ${categoryName}`);
      return null;
    }

    const dayNumber = getDayNumber(dateInput || new Date());
    const safeOffset = Number.isFinite(offset) ? offset : 0;
    const index = (dayNumber + safeOffset) % category.length;

    return category[index];
  }

  function getDailyPack(dateInput) {
    return {
      english: getDailyItem("englishWords", dateInput),
      arabic: getDailyItem("arabicDaily", dateInput),
      islamic: getDailyItem("islamicDaily", dateInput),
      math: getDailyItem("mathDaily", dateInput),
      science: getDailyItem("scienceDaily", dateInput),
      generalKnowledge: getDailyItem("gkDaily", dateInput),
      reading: getDailyItem("readingDaily", dateInput)
    };
  }

  function buildAudioText(categoryName, item) {
    if (!item) return "";

    switch (categoryName) {
      case "english":
      case "englishWords":
        return `Word of the day. ${item.word}. ${item.word} means ${item.meaning}. Example sentence. ${item.sentence}. Mini task. ${item.miniTask}`;

      case "arabic":
      case "arabicDaily":
        return `${item.name}. ${item.word}. Meaning: ${item.meaning}. ${item.miniTask}`;

      case "islamic":
      case "islamicDaily":
        if (item.arabic) {
          return `${item.title}. ${item.arabic}. Meaning: ${item.meaning}. ${item.value}. Mini task. ${item.miniTask}`;
        }
        return `${item.title}. ${item.transliteration}. Meaning: ${item.meaning}. ${item.value}. Mini task. ${item.miniTask}`;

      case "math":
      case "mathDaily":
        return `Math problem of the day. ${item.topic}. ${item.question}. The answer is ${item.answer}. ${item.explanation}. Mini task. ${item.miniTask}`;

      case "science":
      case "scienceDaily":
        return `Science fact of the day. ${item.topic}. ${item.fact}. Question. ${item.question}. Answer. ${item.answer}. Observation task. ${item.observation}`;

      case "gk":
      case "generalKnowledge":
      case "gkDaily":
        return `General knowledge fact of the day. ${item.topic}. ${item.fact}. Question. ${item.question}. Answer. ${item.answer}. Mini task. ${item.miniTask}`;

      case "reading":
      case "readingDaily":
        return `Reading of the day. ${item.title}. ${item.passage}. Word of the story. ${item.word}. ${item.word} means ${item.meaning}. Question. ${item.question}.`;

      default:
        return Object.values(item)
          .filter((value) => typeof value === "string")
          .join(". ");
    }
  }

  function getCategoryProgressTotal(categoryName) {
    const category = DATA[categoryName];
    return Array.isArray(category) ? category.length : 0;
  }

  function getReviewItems(categoryName, count, dateInput) {
    const category = DATA[categoryName];

    if (!Array.isArray(category) || category.length === 0) {
      return [];
    }

    const total = category.length;
    const safeCount = Math.min(Math.max(count || 3, 1), total);
    const dayNumber = getDayNumber(dateInput || new Date());
    const items = [];

    for (let i = 0; i < safeCount; i += 1) {
      const index = (dayNumber - i + total) % total;
      items.push(category[index]);
    }

    return items;
  }

  /*
    Natural kid-friendly voice helper

    Important:
    - Browser speech voices depend on the child/parent device and browser.
    - This function tries to choose the most natural available voice.
    - It prefers high-quality English voices when available.
    - It uses a slightly slower rate and warm pitch for children.
    - No autoplay is used; sound starts only after the child/parent clicks a button.
  */

  function getAvailableVoices() {
    if (!("speechSynthesis" in window)) {
      return [];
    }

    return window.speechSynthesis.getVoices() || [];
  }

  function scoreVoice(voice, lang) {
    const requestedLang = (lang || "en-US").toLowerCase();
    const voiceName = (voice.name || "").toLowerCase();
    const voiceLang = (voice.lang || "").toLowerCase();
    let score = 0;

    if (voiceLang === requestedLang) score += 60;
    if (voiceLang.startsWith(requestedLang.split("-")[0])) score += 35;

    /*
      Common browser/device voices that often sound more natural.
      The exact voice list changes by browser and operating system.
    */
    const preferredNames = [
      "google us english",
      "google uk english female",
      "google uk english male",
      "microsoft aria",
      "microsoft jenny",
      "microsoft michelle",
      "microsoft libby",
      "samantha",
      "victoria",
      "karen",
      "serena",
      "moira",
      "daniel"
    ];

    preferredNames.forEach((name, index) => {
      if (voiceName.includes(name)) {
        score += 50 - index;
      }
    });

    if (voiceName.includes("female")) score += 6;
    if (voiceName.includes("child")) score += 10;
    if (voice.localService) score += 3;

    return score;
  }

  function chooseBestVoice(lang) {
    const voices = getAvailableVoices();

    if (!voices.length) {
      return null;
    }

    return voices
      .slice()
      .sort((a, b) => scoreVoice(b, lang) - scoreVoice(a, lang))[0] || null;
  }

  function createSpeechUtterance(text, lang, options) {
    const speech = new SpeechSynthesisUtterance(text);
    const selectedLang = lang || "en-US";
    const selectedVoice = chooseBestVoice(selectedLang);

    speech.lang = selectedLang;

    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    /*
      Kid-friendly settings:
      - rate below 1.0 keeps pronunciation clearer
      - pitch slightly above 1.0 sounds warmer on many devices
      - volume kept at 1 for clarity
    */
    speech.rate = options?.rate || 0.82;
    speech.pitch = options?.pitch || 1.08;
    speech.volume = options?.volume || 1;

    return speech;
  }

  function speakText(text, lang, repeat) {
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser does not support audio reading.");
      return;
    }

    if (!text || !String(text).trim()) {
      return;
    }

    const speakNow = function () {
      window.speechSynthesis.cancel();

      const firstSpeech = createSpeechUtterance(text, lang || "en-US", {
        rate: 0.82,
        pitch: 1.08,
        volume: 1
      });

      if (repeat) {
        firstSpeech.onend = function () {
          const secondSpeech = createSpeechUtterance(text, lang || "en-US", {
            rate: 0.76,
            pitch: 1.08,
            volume: 1
          });

          window.speechSynthesis.speak(secondSpeech);
        };
      }

      window.speechSynthesis.speak(firstSpeech);
    };

    /*
      Some browsers load voices asynchronously. If voices are not ready,
      wait briefly, then speak with the best available voice.
    */
    if (getAvailableVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = speakNow;
      window.setTimeout(speakNow, 300);
    } else {
      speakNow();
    }
  }

  function getBestVoiceInfo(lang) {
    const voice = chooseBestVoice(lang || "en-US");

    if (!voice) {
      return {
        available: false,
        name: "Default browser voice",
        lang: lang || "en-US"
      };
    }

    return {
      available: true,
      name: voice.name,
      lang: voice.lang,
      localService: voice.localService
    };
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  window.AlHayatLearningData = {
    version: "1.0.0",
    baseDate: BASE_DATE,
    data: DATA,
    getDayNumber,
    getDailyItem,
    getDailyPack,
    buildAudioText,
    getCategoryProgressTotal,
    getReviewItems,
    speakText,
    getBestVoiceInfo,
    stopSpeech
  };
})();
