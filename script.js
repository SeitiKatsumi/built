const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = [...document.querySelectorAll("[data-section]")];
const gallery = document.querySelector("[data-gallery]");

const heroImages = [
  "assets/images/built-10.webp",
  "assets/images/built-01.webp",
  "assets/images/built-15.webp",
  "assets/images/built-20.webp"
];

const hero = document.querySelector(".hero");
const slider = document.createElement("div");
slider.className = "hero-slider";

const dots = document.createElement("div");
dots.className = "hero-progress";

let activeSlide = 0;
let slideTimer;

heroImages.forEach((src, index) => {
  const img = document.createElement("img");
  img.className = `hero-slide${index === 0 ? " is-active" : ""}`;
  img.src = src;
  img.alt = "";
  img.decoding = "async";
  slider.appendChild(img);

  const dot = document.createElement("button");
  dot.className = `hero-dot${index === 0 ? " is-active" : ""}`;
  dot.type = "button";
  dot.setAttribute("aria-label", `Ver banner ${index + 1}`);
  dot.addEventListener("click", () => showSlide(index, true));
  dots.appendChild(dot);
});

hero.prepend(slider);
hero.appendChild(dots);

const slides = [...document.querySelectorAll(".hero-slide")];
const slideDots = [...document.querySelectorAll(".hero-dot")];

function showSlide(index, resetTimer = false) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === activeSlide));
  slideDots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === activeSlide));

  if (resetTimer) {
    clearInterval(slideTimer);
    startSlider();
  }
}

function startSlider() {
  slideTimer = setInterval(() => showSlide(activeSlide + 1), 4600);
}

startSlider();

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
