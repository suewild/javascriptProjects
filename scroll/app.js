// /** set date */
// const date = document.getElementById("date");
// date.innerHTML = new Date().getFullYear();
// /** close links */
// const linksContainer = document.querySelector(".links-container");
// const links = document.querySelector(".links");
// const navToggle = document.querySelector(".nav-toggle");

// navToggle.addEventListener("click", function () {
//   // set links container to visible
//   // in this setup the height in this show-links class is fixed
//   // that might not always work
//   // particularly if the links you display are dynamic
//   // so commenting out for now and trying
//   // alternative approach where we calucalate the height
//   // of show-links
//   //linksContainer.classList.toggle("show-links");
//   const containerHeight = linksContainer.getBoundingClientRect().height;
//   //console.log("containerHeight: ", containerHeight);
//   const linksHeight = links.getBoundingClientRect().height;
//   //console.log("linksHeight: ", linksHeight);
//   if (containerHeight === 0) {
//     // i.e. default setup
//     linksContainer.style.height = `${linksHeight}px`;
//   } else {
//     linksContainer.style.height = 0;
//   }
// });

// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // linksContainer.classList.toggle("show-links");

  const linksHeight = links.getBoundingClientRect().height;
  //console.log("linksHeight: ", linksHeight);
  const containerHeight = linksContainer.getBoundingClientRect().height;
  //console.log("containerHeight", containerHeight);
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
  // console.log(linksContainer.getBoundingClientRect());
});

// ********** fixed navbar ************

/** scrollY - provides the number of pixels the document
 *  is currently scrolled along the vertical axis */

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.scrollY;
  //console.log("scrollheight: ", scrollHeight);
  //console.log("pageOffSetY", window.pageYOffset);
  const navBarHeight = navbar.getBoundingClientRect().height;
  //console.log("navBarHeight: ", navBarHeight);
  if (scrollHeight > navBarHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

//** improved smooth scrolling */
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav"); // returns true or false
    let position = element.offsetTop - navHeight;
    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      // e.g. links are already open
      position = position + containerHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
    });
    // close navigation
    linksContainer.style.height = 0;
  });
});

// improve scrolling

// const navbar = document.getElementById("nav");
// const topLink = document.querySelector(".top-link");

// window.addEventListener("scroll", function () {
//   const scrollHeight = window.pageYOffset;
//   const navHeight = navbar.getBoundingClientRect().height;
//   if (scrollHeight > navHeight) {
//     navbar.classList.add("fixed-nav");
//   } else {
//     navbar.classList.remove("fixed-nav");
//   }
//   // setup back to top link

//   if (scrollHeight > 500) {
//     console.log("helo");

//     topLink.classList.add("show-link");
//   } else {
//     topLink.classList.remove("show-link");
//   }
// });

// ********** smooth scroll ************
// select links
// const scrollLinks = document.querySelectorAll(".scroll-link");
// scrollLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     // prevent default
//     e.preventDefault();
//     // navigate to specific spot
//     const id = e.currentTarget.getAttribute("href").slice(1);
//     const element = document.getElementById(id);

//     const navHeight = navbar.getBoundingClientRect().height;
//     const containerHeight = linksContainer.getBoundingClientRect().height;
//     const fixedNav = navbar.classList.contains("fixed-nav");
//     let position = element.offsetTop - navHeight;

//     if (!fixedNav) {
//       position = position - navHeight;
//     }
//     if (navHeight > 82) {
//       position = position + containerHeight;
//     }

//     window.scrollTo({
//       left: 0,
//       top: position,
//     });
//     // close
//     linksContainer.style.height = 0;
//   });
// });
// // calculate heights
