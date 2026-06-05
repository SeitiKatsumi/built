const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = [...document.querySelectorAll("[data-section]")];
const gallery = document.querySelector("[data-gallery]");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-42% 0px -45% 0px", threshold: 0.01 }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealTargets = document.querySelectorAll(
  ".intro-band h2, .lead-stack, .section-heading, .module-card, .experience-panel, .gallery-track, .app-content"
);

revealTargets.forEach((target) => target.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
});

document.querySelector("[data-gallery-prev]").addEventListener("click", () => {
  gallery.scrollBy({ left: -gallery.clientWidth * 0.72, behavior: "smooth" });
});

document.querySelector("[data-gallery-next]").addEventListener("click", () => {
  gallery.scrollBy({ left: gallery.clientWidth * 0.72, behavior: "smooth" });
});
