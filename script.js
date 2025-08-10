//QUERY SELECTORS
const heroHeading = document.querySelector(".hero-text__heading--title");
const heroMessage = document.querySelector(".hero-text--hello-message");
const heroIllustrationContainer = document.querySelector(
  ".header__page-hero--illustration"
);
const heroButton = document.querySelector(".hero-text__heading--button");
const illustration = document.getElementById("illustration");
const opacityCtr = (dom, num) => {
  return (dom.style.opacity = `${num}`);
};
const body = document.querySelector("body");
const burger = document.querySelector("#nav-burger");

//UTILITIES
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

/*----------*/
//observer function - I learned this newly for this project!
const opacityOnScroll = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
    }
  });
};

const observer = new IntersectionObserver(opacityOnScroll);
const technicalSkillsTitle = document.querySelector(
  ".main-container__technical-skills--title"
);
const projectsTitle = document.querySelector(
  ".main-container__projects--title"
);
const aboutTitle = document.querySelector(".profile__text--title");
[technicalSkillsTitle, projectsTitle, aboutTitle].forEach((title) => {
  observer.observe(title);
});

/*------------------------------*/
//Burger

burger.addEventListener("click", () => {
  let clicker = 1;
  body.style.overflow = "hidden";
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  const newNav = document.createElement("nav");
  newNav.classList.add("overlay--newNav");
  overlay.appendChild(newNav);

  const a1 = createAnchor(
    "About",
    "overlay--newNav__link",
    "#about",
    "Go to about me to read biography"
  );
  const a2 = createAnchor(
    "Projects",
    "overlay--newNav__link",
    "#projects",
    "Go to projects page to see creations"
  );
  const a3 = createAnchor(
    "Contact",
    "overlay--newNav__link",
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

/*------------------------------*/
/*Rabbit link */

rabbit = document.querySelector(".icon-box--white-rabbit");

rabbit.addEventListener("click", () => {
  window.open(
    "https://sleephawk.github.io/matt-writes-code/alt-home.html",
    "_blank"
  );
});
