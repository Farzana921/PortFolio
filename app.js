//Mobile menu
const toggleBtn = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");

if (toggleBtn && navMenu) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link
  navMenu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    navMenu.classList.remove("active");
    toggleBtn.setAttribute("aria-expanded", "false");
  });
}

//Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Active nav link on scroll 
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const setActiveLink = (id) => {
  navLinks.forEach((a) => {
    const href = a.getAttribute("href");
    const isActive = href === `#${id}`;
    a.classList.toggle("active", isActive);
    if (isActive) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    // pick the most visible section
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActiveLink(visible.target.id);
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: [0.12, 0.2, 0.35] }
);

sections.forEach((sec) => sectionObserver.observe(sec));

// Projects
const projects = [
  {
    title: "Personal Portfolio",
    image: "images/PortFolio.png", 
    emoji: "🌐",
    desc: "Responsive single-page portfolio with smooth scroll, animations, and modern UI.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://farzana921.github.io/PortFolio/",
    code: "https://github.com/Farzana921/PortFolio"
  },
  {
    title: "Pocket Classroom (Final Project)",
    image: "images/pocket.png",
    emoji: "📚",
    desc: "A classroom-style web app built as my final project, focused on a clean UI and practical features for learning.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://farzana921.github.io/pocket-classroom-final-project/",
    code: "https://github.com/Farzana921/pocket-classroom-final-project"
  },
  {
    title: "Foodie Hub",
    image: "images/foodia.png",
    emoji: "🍔",
    desc: "A food-themed web app showcasing restaurant-style UI with interactive elements and responsive layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://farzana921.github.io/Foodie_hub-/",
    code: "https://github.com/Farzana921/Foodie_hub-"
  },
  {
    title: "Library Page (Team Project)",
    image: "images/library.png",
    emoji: "📖",
    desc: "Part of a team-built website — I worked on the Library Page UI and layout to make it clean, intuitive and responsive.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://satayesh-esmaily.github.io/Firewall-Power-Web-Seda-/library.html",
    code: "#"
  },
  {
    title: "Clean the Park Game",
    image: "images/game.png", 
    emoji: "🌱",
    desc: "A simple browser game that encourages environmental awareness through interactive gameplay.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://farzana921.github.io/Clean-the-Park-game/",
    code: "https://github.com/Farzana921/Clean-the-Park-game"
  },
  {
    title: "Afghan Proverbs Website",
    image: "images/Afghan.png", 
    emoji: "📜",
    desc: "A cultural website presenting Afghan proverbs with meaning and style — blending tradition with a clean web layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://farzana921.github.io/Afghan-proverbs-website/",
    code: "https://github.com/Farzana921/Afghan-proverbs-website"
  }
];

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = projects
    .map((p) => {
      const tags = (p.tags || [])
        .map((t) => `<span class="tag">${t}</span>`)
        .join("");

      const liveLink =
        p.live && p.live !== "#"
          ? `<a class="pill-link" href="${p.live}" target="_blank" rel="noopener">
               <i class="fa-solid fa-arrow-up-right-from-square"></i> Live
             </a>`
          : "";

      const codeLink =
        p.code && p.code !== "#"
          ? `<a class="pill-link" href="${p.code}" target="_blank" rel="noopener">
               <i class="fab fa-github"></i> Code
             </a>`
          : "";

      // Full-width
      return `
        <article class="project-card reveal">

          <div class="project-image">
            ${
              p.image
                ? `<img src="${p.image}" alt="${p.title} screenshot" loading="lazy">`
                : `<div class="project-fallback">${p.emoji || "✨"}</div>`
            }
          </div>

          <div class="project-content">
            <h4 class="project-title">${p.title}</h4>

            <p class="project-desc">${p.desc || ""}</p>

            <div class="tags">${tags}</div>

            <div class="project-links">
              ${liveLink}
              ${codeLink}
            </div>
          </div>

        </article>
      `;
    })
    .join("");

  // Observe newly created .reveal items
  const newRevealEls = grid.querySelectorAll(".reveal");
  newRevealEls.forEach((el) => revealObserver.observe(el));
}

renderProjects();

//Contact form -> mailto (no backend)

const contactForm = document.getElementById("contactForm");
const liveRegion = document.getElementById("formLiveRegion");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (liveRegion) liveRegion.textContent = "Sending…";

    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        contactForm.reset();
        if (liveRegion) liveRegion.textContent = "✅ Message sent! I’ll reply soon.";
      } else {
        if (liveRegion) liveRegion.textContent = "❌ Something went wrong. Please try again.";
      }
    } catch (err) {
      if (liveRegion) liveRegion.textContent = "❌ Network error. Please try again.";
    }
  });
}
