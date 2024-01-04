"stirct mode";

const slides = document.querySelectorAll(".slide");
const sliderButtonLeft = document.querySelector(".slider__btn--left");
const sliderButtonRight = document.querySelector(".slider__btn--right");
const sliderDivDots = document.querySelector(".dots");
const sliderDots = [];
const firstSlider = 1;
let activeDot = firstSlider - 1;

////////////////////////////////////////////
// Implamenting slider component:
// Functions:
const slideSliders = function (direction) {
  activeDot -= direction;
  // Remove the last actived dot.
  sliderDots.forEach((dot) => dot.classList.remove("dots__dot--active"));

  // Activate the new selected dot.
  sliderDots[activeDot].classList.add("dots__dot--active");

  slides.forEach(
    (slide) =>
      (slide.style.transform = `translateX(${
        direction * 100 + Number.parseInt(slide.style.transform.slice(11), 10) // get the current place of a slide and add or decrease it by a 100%.
      }%)`)
  );
};

// Load the slider organized.
slides.forEach(
  (slide, i) =>
    (slide.style.transform = `translateX(${
      i * 100 - (firstSlider - 1) * 100
    }%)`)
);

// Part1 - sliding buttons left and right.
const slideLeft = function () {
  // Check if the slider is at start:
  if (Number.parseInt(slides[0].style.transform.slice(11), 10) === 0) {
    slideSliders((slides.length - 1) * -1); // Go to last slide.
  } else slideSliders(1); // Move all the slide to the left.
};
sliderButtonLeft.addEventListener("click", slideLeft);

const slideRight = function () {
  // Check if the slider is at end:
  if (
    Number.parseInt(slides[slides.length - 1].style.transform.slice(11), 10) ===
    0
  ) {
    slideSliders(slides.length - 1); // Go to first slide.
  } else slideSliders(-1); // Move all the slide to the right.
};
sliderButtonRight.addEventListener("click", slideRight);

// Part2 - sliding with arrow keys.

document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "ArrowLeft") slideLeft();
  else if (e.key === "ArrowRight") slideRight();
});

// Part3 - sliding with sliders dots.

// Create amount of dots corresponding to amount of slides.
slides.forEach((_, i) => {
  const newDot = document.createElement("button");
  newDot.classList.add("dots__dot");
  newDot.setAttribute("data-slide", i);
  sliderDivDots.append(newDot);
  sliderDots.push(newDot);
});

// Activate the first dot.
sliderDots[firstSlider - 1].classList.add("dots__dot--active");

// Click on dot functionallity.
sliderDivDots.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    // slide to the corresponding slide.
    slideSliders(-1 * (e.target.dataset.slide - activeDot));
    // this function also adds and removes the class that makes the dot active.

    activeDot = e.target.dataset.slide;
  }
});
