// when user clicks modal-btn add .open-modal to modal-overlay
// when user clicks close-btn remove .open-modal from modal-overlay

const openModalBtn = document.querySelector(".modal-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const closeModalBtn = document.querySelector(".close-btn");

openModalBtn.addEventListener("click", function () {
  modalOverlay.classList.add("open-modal");
});

closeModalBtn.addEventListener("click", function () {
  modalOverlay.classList.remove("open-modal");
});
