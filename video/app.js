// select button
const btn = document.querySelector(".switch-btn");
// select video container
const video = document.querySelector(".video-container");
// preloader
const preloader = document.querySelector(".preloader");

// play or pause
btn.addEventListener("click", function () {
  // if the button doesn't contain the class slide
  if (!btn.classList.contains("slide")) {
    btn.classList.add("slide");
    video.pause();
  } else {
    // if it does contain it, then remove it
    btn.classList.remove("slide");
    video.play();
  }
});

// hide the preloader once the load event is fired
// and the whole page has loaded
window.addEventListener("load", function () {
  preloader.classList.add("hide-preloader");
});
