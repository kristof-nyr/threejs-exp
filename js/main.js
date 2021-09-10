// const timelineLink = document.querySelector('.timeline-open');
// const timeline = document.querySelector('.timeline');
// const timelineClose = document.querySelector('.timeline-close');

// timelineLink.onclick = () => {
//     timeline.style.transform = "translate(0)";
// }

// timelineClose.onclick = () => {
//     timeline.style.transform = "translate(100%)";
// }

// timelineClose.onmouseover = () => {
//     timelineClose.style.transform = "rotate(45deg)";
// }

// timelineClose.onmouseleave = () => {
//     timelineClose.style.transform = "rotate(0deg)";
// }

const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});