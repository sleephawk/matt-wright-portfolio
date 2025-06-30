//fades in hero content
document.addEventListener("DOMContentLoaded", () => {
  const heroHeading = document.querySelector(".hero-text__heading--title");
  const heroMessage = document.querySelector(".hero-text--hello-message");
  const heroIllustration = document.querySelector(
    ".header__page-hero--illustration"
  );
  const heroButton = document.querySelector(".hero-text__heading--button");
  setTimeout(() => {
    heroMessage.style.opacity = "1";
  }, 100);
  setTimeout(() => {
    heroHeading.style.opacity = "1";
  }, 300);
  setTimeout(() => {
    heroButton.style.opacity = "1";
    heroIllustration.style.transform = "scale(1)";
    document.getElementById("illustration").style.opacity = "1";
  }, 500);
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
  window.location.href =
    "https://sleephawk.github.io/matt-writes-code/alt-home.html";
});
