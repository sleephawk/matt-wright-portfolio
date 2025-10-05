//QUERY SELECTORS /*-------------------------------------*/
const heroHeading = document.querySelector(".header__hero-heading");
const heroMessage = document.querySelector(".header__hero-message");
const heroIllustrationContainer = document.querySelector(
  ".header__hero-illustration"
);
const heroButton = document.querySelector(".header__hero-link");
const illustration = document.getElementById("illustration");
const opacityCtr = (dom, value) => {
  return (dom.style.opacity = `${value}`);
};
const body = document.querySelector("body");
const burger = document.querySelector("#nav-burger");
const technicalSkillsTitle = document.querySelector(".technical-skills__title");
const projectsTitle = document.querySelector(".projects__title");
const aboutTitle = document.querySelector(".profile__title");

//UTILS /*-------------------------------------*/

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createAnchor = (linkText, linkClass, linkUrl, linkLabel) => {
  const link = document.createElement("a");
  link.textContent = linkText;
  link.classList.add(linkClass);
  link.setAttribute("href", linkUrl);
  link.setAttribute("aria-label", linkLabel);
  return link;
};

const heroFadeIn = async (time1, time2, time3, ...dom) => {
  await sleep(time1);
  opacityCtr(dom[0], 1);
  await sleep(time2);
  if (dom[1]) opacityCtr(dom[1], 1);
  await sleep(time3);
  if (dom[2]) opacityCtr(dom[0], 2);
  if (dom[3]) dom[3].style.transform = "scale(1)";
  if (dom[4]) opacityCtr(dom[4], 1);
};

document.addEventListener("DOMContentLoaded", () => {
  heroFadeIn(
    100,
    300,
    500,
    heroMessage,
    heroHeading,
    heroButton,
    heroIllustrationContainer,
    illustration
  );
});

//observer function - I learned this newly for this project! /*----------*/
const opacityOnScroll = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
    }
  });
};

const observer = new IntersectionObserver(opacityOnScroll);

[technicalSkillsTitle, projectsTitle, aboutTitle].forEach((title) => {
  observer.observe(title);
});

//BURGER/*------------------------------*/

burger.addEventListener("click", () => {
  body.style.overflow = "hidden";
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  const newNav = document.createElement("nav");
  newNav.classList.add("overlay__newNav");
  overlay.appendChild(newNav);

  const a1 = createAnchor(
    "About",
    "overlay__newNavLink--about",
    "#about",
    "Go to about me to read biography"
  );
  const a2 = createAnchor(
    "Projects",
    "overlay__newNavLink--projects",
    "#projects",
    "Go to projects page to see creations"
  );
  const a3 = createAnchor(
    "Contact",
    "overlay__newNavLink--contact",
    "mailto:Matt.Wright@nology.io",
    "Contact Matt via email"
  );
  [a1, a2, a3].forEach((a) => newNav.appendChild(a));
  document.body.appendChild(overlay);

  const closeOverlay = () => {
    body.style.overflow = "";
    overlay.remove();
    document.removeEventListener("click", closeOverlay);
  };
  const handleEscape = (e) => {
    if (e.key === "Escape") closeOverlay(); // capital 'E' in "Escape"
  };
  // Small delay so burger click doesn't immediately trigger close
  setTimeout(() => {
    newNav.style.opacity = "1";
    document.addEventListener("click", closeOverlay);
    document.addEventListener("keydown", handleEscape);
  }, 50);
});

//RABBIT /*------------------------------*/

rabbit = document.querySelector(".icon-box--white-rabbit");

rabbit.addEventListener("click", () => {
  window.open(
    "https://sleephawk.github.io/matt-writes-code/alt-home.html",
    "_blank"
  );
});
