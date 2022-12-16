// Hamburger menu

const burger = document.getElementsByClassName("burger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.getElementsByClassName("nav-link");

burger[0].classList.add("unToggled");
burger[0].addEventListener("click", () => {
  burger[0].classList.toggle("toggled");
  burger[0].classList.toggle("unToggled");
  navMenu.classList.toggle("active");
});

for (let navLink of navLinks) {
  navLink.addEventListener("click", () => {
    burger[0].classList.remove("toggled");
    navMenu.classList.remove("active");
  });
}

// Hide navbar on scroll

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
};

// Buttons from projects

const demoButtons = document.getElementsByClassName("cta-btn-demo");
const projectImages = document.getElementsByClassName("projectImage");

const setIdToDemoButtons = () => {
  let i = 1;
  for (let demoButton of demoButtons) {
    demoButton.setAttribute("id", `demo-button-${i}`);
    i++;
  }
};

const setIdToProjectImages = () => {
  let i = 1;
  for (let projectImage of projectImages) {
    projectImage.setAttribute("id", `project-image-${i}`);
    i++;
  }
};

const setFilterNone = () => {
  for (let demoButton of demoButtons) {
    demoButton.addEventListener("mouseover", (e) => {
      const id = e.target.id;
      const projectImageId = "project-image-" + id.slice(id.length - 1, id.length);
      document.getElementById(projectImageId).classList.add("projectImageColors");
    });
    demoButton.addEventListener("mouseout", (e) => {
      const id = e.target.id;
      const projectImageId = "project-image-" + id.slice(id.length - 1, id.length);
      document.getElementById(projectImageId).classList.remove("projectImageColors");
    });
  }
};

setIdToDemoButtons();
setIdToProjectImages();
setFilterNone();

/* Back to top */

const btnBackToTop = document.getElementsByClassName("scrollToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 3700) {
    btnBackToTop[0].classList.add("btnActive");
  } else {
    btnBackToTop[0].classList.remove("btnActive");
  }
});

btnBackToTop[0].addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
