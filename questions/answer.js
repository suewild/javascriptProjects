// traversing the DOM

const btns = document.querySelectorAll(".question-btn");

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    // console.log(e.currentTarget.parentElement.parentElement);
    const question = e.currentTarget.parentElement.parentElement; // parentElement is article
    question.classList.toggle("show-text"); // toggle adds or removes class
  });
});
