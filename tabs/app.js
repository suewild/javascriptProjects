const about = document.querySelector(".about");
const btns = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");

// add event listener to about
// e is event target
about.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    // remove active from all btns
    btns.forEach(function (btn) {
      btn.classList.remove("active");
    });
    // add active to clicked on btn
    e.target.classList.add("active");
    // remove active from articles
    articles.forEach(function (article) {
      article.classList.remove("active");
      // add active to article with id
    });
    // add active to article with id
    const content = document.getElementById(id);
    console.log("element is: ", content);
    content.classList.add("active");
  }
});
