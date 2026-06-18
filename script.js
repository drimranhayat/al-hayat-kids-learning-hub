const menuButton = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
<<<<<<< HEAD
const progressKey = "alhayatKidsProgress";
const ageKey = "alhayatKidsAge";
const whatsAppNumber = "923354910481";

const quizBank = [
  { age: "3-4", subject: "English", question: "Which word starts with A?", options: ["Apple", "Ball", "Sun"], answer: "Apple" },
  { age: "3-4", subject: "Math", question: "How many stars: ★ ★?", options: ["1", "2", "3"], answer: "2" },
  { age: "5-6", subject: "Arabic", question: "Which letter is ب?", options: ["ب", "ت", "ن"], answer: "ب" },
  { age: "5-6", subject: "Islamic", question: "What should we say before eating?", options: ["Bismillah", "Good night", "Hello"], answer: "Bismillah" },
  { age: "7-8", subject: "Science", question: "Plants need water and what else?", options: ["Sunlight", "Shoes", "Toys"], answer: "Sunlight" },
  { age: "7-8", subject: "Computer", question: "Which part helps us type?", options: ["Keyboard", "Plate", "Book"], answer: "Keyboard" }
];

const getProgress = () => JSON.parse(localStorage.getItem(progressKey) || '{"stars":0,"today":0,"badges":[]}');
const saveProgress = (progress) => localStorage.setItem(progressKey, JSON.stringify(progress));

=======
const leadForm = document.querySelector("[data-lead-form]");
const formStatus = document.querySelector("[data-form-status]");

const whatsAppNumber = "923354910481";

>>>>>>> 57b951fdbc251ad95f5faf2ac9428a6d5afec717
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
<<<<<<< HEAD
=======

>>>>>>> 57b951fdbc251ad95f5faf2ac9428a6d5afec717
  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navLinks.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

<<<<<<< HEAD
function updateProgressView() {
  const progress = getProgress();
  document.querySelectorAll("[data-stars]").forEach((node) => { node.textContent = progress.stars; });
  document.querySelectorAll("[data-today]").forEach((node) => { node.textContent = progress.today; });
  document.querySelectorAll("[data-badges]").forEach((node) => { node.textContent = progress.badges.length; });
  document.querySelectorAll("[data-continue]").forEach((node) => {
    node.hidden = progress.today === 0 && progress.stars === 0;
  });
}

document.querySelectorAll("[data-complete-task]").forEach((button) => {
  button.addEventListener("click", () => {
    const progress = getProgress();
    progress.stars += 1;
    progress.today += 1;
    if (progress.stars >= 5 && !progress.badges.includes("Starter Star")) progress.badges.push("Starter Star");
    if (progress.stars >= 10 && !progress.badges.includes("Bright Learner")) progress.badges.push("Bright Learner");
    saveProgress(progress);
    button.textContent = "Completed +1 star";
    button.disabled = true;
    updateProgressView();
  });
});

function applyAgeFilter(age) {
  localStorage.setItem(ageKey, age);
  document.querySelectorAll("[data-age-option]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.ageOption === age);
    button.setAttribute("aria-pressed", String(button.dataset.ageOption === age));
  });
  document.querySelectorAll("[data-age]").forEach((node) => {
    const ages = node.dataset.age.split(" ");
    node.classList.toggle("hidden-by-age", age !== "all" && !ages.includes(age));
  });
}

document.querySelectorAll("[data-age-option]").forEach((button) => {
  button.addEventListener("click", () => applyAgeFilter(button.dataset.ageOption));
});

if (document.querySelector("[data-age-option]")) {
  applyAgeFilter(localStorage.getItem(ageKey) || "all");
}

function renderQuiz() {
  const mount = document.querySelector("[data-quiz-enhanced]");
  if (!mount) return;
  const age = localStorage.getItem(ageKey) || "all";
  const selectedSubject = document.querySelector("[data-subject-filter]")?.value || "all";
  const filtered = quizBank.filter((item) => (age === "all" || item.age === age) && (selectedSubject === "all" || item.subject === selectedSubject));
  const questions = filtered.length ? filtered : quizBank.slice(0, 4);
  mount.innerHTML = questions.map((item, index) => `
    <article class="quiz-card" data-question="${index}">
      <span class="age-pill">Ages ${item.age}</span>
      <span class="skill-pill">${item.subject}</span>
      <h3>${item.question}</h3>
      <div class="quiz-options">
        ${item.options.map((option) => `<button type="button" data-answer="${option}" data-correct="${item.answer}">${option}</button>`).join("")}
      </div>
      <p class="feedback" aria-live="polite"></p>
    </article>
  `).join("");
}

document.addEventListener("click", (event) => {
  const option = event.target.closest("[data-answer]");
  if (!option) return;
  const card = option.closest(".quiz-card");
  const isCorrect = option.dataset.answer === option.dataset.correct;
  card.querySelectorAll("[data-answer]").forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === button.dataset.correct) button.classList.add("correct");
  });
  option.classList.add(isCorrect ? "correct" : "wrong");
  card.querySelector(".feedback").textContent = isCorrect ? "Great job! You earned a star." : "Good try. Look at the green answer.";
  if (isCorrect) {
    const progress = getProgress();
    progress.stars += 1;
    progress.today += 1;
    saveProgress(progress);
    updateProgressView();
  }
});

document.querySelector("[data-subject-filter]")?.addEventListener("change", renderQuiz);
document.querySelectorAll("[data-age-option]").forEach((button) => button.addEventListener("click", renderQuiz));
renderQuiz();

document.querySelectorAll("[data-print]").forEach((button) => {
  button.addEventListener("click", () => window.print());
});

const leadForm = document.querySelector("[data-lead-form]");
if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(leadForm);
    const message = [
      "Assalamu alaikum, I would like to ask about Al-Hayat Kids Learning Hub.",
      "",
      `Parent name: ${formData.get("parentName") || ""}`,
      `Child age: ${formData.get("childAge") || ""}`,
      `Program interest: ${formData.get("program") || ""}`,
      `Preferred class type: ${formData.get("classType") || ""}`,
      `Learning goal: ${formData.get("goal") || ""}`
    ].join("\n");
    window.open(`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}

updateProgressView();
=======
if (leadForm && formStatus) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const parentName = formData.get("parentName").toString().trim();
    const childAge = formData.get("childAge").toString().trim();
    const program = formData.get("program").toString().trim();
    const classType = formData.get("classType").toString().trim();
    const goal = formData.get("goal").toString().trim();

    const message = [
      "Assalamu alaikum, I would like to book a free trial class for Al-Hayat Kids Learning Hub.",
      "",
      `Parent name: ${parentName}`,
      `Child age: ${childAge}`,
      `Program interest: ${program}`,
      `Preferred class type: ${classType}`,
      `Learning goal: ${goal}`,
    ].join("\n");

    const url = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
    formStatus.textContent = "Opening WhatsApp with your inquiry message.";
    window.open(url, "_blank", "noopener,noreferrer");
  });
}
>>>>>>> 57b951fdbc251ad95f5faf2ac9428a6d5afec717
