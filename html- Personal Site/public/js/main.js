"use strict";

document.documentElement.classList.add("js");

const BIRTHDAY = new Date(2005, 7, 10); // 10 Aug 2005 (months are 0-based)

// ---------------------------------------------------------------------------
// Age & year
// ---------------------------------------------------------------------------
const getAge = function (birthday) {
  const now = new Date();
  let age = now.getFullYear() - birthday.getFullYear();
  const hadBirthday =
    now.getMonth() > birthday.getMonth() ||
    (now.getMonth() === birthday.getMonth() && now.getDate() >= birthday.getDate());
  if (!hadBirthday) age--;
  return age;
};

document.getElementById("age").textContent = getAge(BIRTHDAY);
document.getElementById("year").textContent = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Theme toggle
// ---------------------------------------------------------------------------
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

const currentTheme = function () {
  if (root.dataset.theme) return root.dataset.theme;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

themeToggle.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// ---------------------------------------------------------------------------
// Nav: background on scroll, mobile menu, active link
// ---------------------------------------------------------------------------
const nav = document.getElementById("nav");
const navLinks = document.getElementById("nav-links");
const burger = document.getElementById("nav-burger");

const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const setMenu = function (open) {
  navLinks.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
};

burger.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});

const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]`);
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
      linkFor(entry.target.id)?.classList.add("active");
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

// ---------------------------------------------------------------------------
// Reveal on scroll
// ---------------------------------------------------------------------------
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------------------------------------------------------------------------
// DNA helix (hero)
// ---------------------------------------------------------------------------
const helix = document.getElementById("helix");
const PAIRS = 18;
const RADIUS = 95; // px, half the helix width
const TWIST = 0.38; // radians between neighbouring base pairs
const SPEED = 0.0012; // radians per ms

const pairs = Array.from({ length: PAIRS }, () => {
  const pair = document.createElement("div");
  pair.className = "helix__pair";
  pair.innerHTML =
    '<span class="helix__rung"></span><span class="helix__dot helix__dot--a"></span><span class="helix__dot helix__dot--b"></span>';
  helix.append(pair);
  return {
    rung: pair.querySelector(".helix__rung"),
    a: pair.querySelector(".helix__dot--a"),
    b: pair.querySelector(".helix__dot--b"),
  };
});

const placeStrand = function (dot, angle) {
  const x = Math.sin(angle) * RADIUS;
  const depth = (Math.cos(angle) + 1) / 2; // 0 = back, 1 = front
  dot.style.transform = `translateX(${x}px) scale(${0.55 + depth * 0.6})`;
  dot.style.opacity = 0.35 + depth * 0.65;
  dot.style.zIndex = depth > 0.5 ? 2 : 0;
};

const drawHelix = function (time) {
  pairs.forEach(({ rung, a, b }, i) => {
    const angle = time * SPEED + i * TWIST;
    placeStrand(a, angle);
    placeStrand(b, angle + Math.PI);
    // The rung spans between the two strands: from -x to +x
    const x = Math.sin(angle) * RADIUS;
    rung.style.transform = `translateX(${-Math.abs(x)}px) scaleX(${Math.abs(2 * x)})`;
  });
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let helixVisible = true;

// Only animate while the hero is on screen
new IntersectionObserver(([entry]) => (helixVisible = entry.isIntersecting)).observe(helix);

const animateHelix = function (time) {
  if (helixVisible) drawHelix(time);
  requestAnimationFrame(animateHelix);
};

if (reducedMotion) drawHelix(0);
else requestAnimationFrame(animateHelix);

// ---------------------------------------------------------------------------
// Certificate modal
// ---------------------------------------------------------------------------
const modal = document.getElementById("cert-modal");
const certImg = document.getElementById("cert-img");

document.querySelectorAll("[data-cert]").forEach((btn) => {
  btn.addEventListener("click", () => {
    certImg.src = btn.dataset.cert;
    certImg.alt = `${btn.dataset.title} certificate`;
    document.getElementById("cert-title").textContent = btn.dataset.title;
    document.getElementById("cert-link").href = btn.dataset.url;
    modal.showModal();
  });
});

modal.querySelector("[data-close]").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close(); // click on the backdrop
});

// ---------------------------------------------------------------------------
// Copy email
// ---------------------------------------------------------------------------
const toast = document.getElementById("toast");
let toastTimer;

const showToast = function (message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
};

document.getElementById("copy-email").addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(this.dataset.email);
    showToast("Email copied ✓");
  } catch (e) {
    window.location.href = `mailto:${this.dataset.email}`;
  }
});
