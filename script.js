const menuButton = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const leadForm = document.querySelector("[data-lead-form]");
const formStatus = document.querySelector("[data-form-status]");

const whatsAppNumber = "923354910481";

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navLinks.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

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
