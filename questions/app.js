// plus-icon
// minus-icon
// show-text is added to .question

// const openQuestionBtns = document.querySelectorAll(".plus-icon");
// const closeQuestionBtns = document.querySelectorAll(".minus-icon");
// const questions = document.querySelectorAll(".question");
const btns = document.querySelectorAll(".question-btn");

// openQuestionBtns.forEach((btn) => {
//   btn.addEventListener("click", function () {
//     // Access the corresponding question element based on the button's index
//     const question = btn.closest(".question");

//     // Check if the individual question element contains the "show-text" class
//     if (!question.classList.contains("show-text")) {
//       question.classList.add("show-text");
//     }
//   });
// });

// closeQuestionBtns.forEach((btn) => {
//   btn.addEventListener("click", function () {
//     // Access the corresponding question element based on the button's index
//     const question = btn.closest(".question");

//     // Check if the individual question element contains the "show-text" class
//     if (question.classList.contains("show-text")) {
//       question.classList.remove("show-text");
//     }
//   });
// });

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    // Access the corresponding question element based on the button's index
    const question = btn.closest(".question");
    question.classList.toggle("show-text"); // toggle adds or removes class
  });
});
