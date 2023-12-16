// classList  - shows/gets all classes
// contains   - checks classList for specific class
// add        - add class
// remove     - remove class
// toggle     - toggles class

const links = document.querySelector(".links");
const navToggle = document.querySelector(".nav-toggle");

navToggle.addEventListener("click", function () {
  // if the show-links class is not present, add it
  // if it is present, remove it
  //   if (!links.classList.contains("show-links")) {
  //     links.classList.add("show-links");
  //   } else {
  //     links.classList.remove("show-links");
  //   }

  // alternative way to do the above
  links.classList.toggle("show-links");
});
