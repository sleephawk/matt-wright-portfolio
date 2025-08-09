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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

/*Rabbit link */

rabbit = document.querySelector(".icon-box--white-rabbit");

rabbit.addEventListener("click", () => {
  window.open(
    "https://sleephawk.github.io/matt-writes-code/alt-home.html",
    "_blank"
  );
});
