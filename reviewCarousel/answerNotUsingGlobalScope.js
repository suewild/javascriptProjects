// Function to create a review handler.
const createReviewHandler = () => {
  // Encapsulated state: currentItem is now scoped within the closure and not global.
  let currentItem = 0;

  // Function to display the current review on the page.
  const showPerson = () => {
    // Retrieve the review item based on currentItem's value.
    const item = reviews[currentItem];
    // Update the page elements with the review's information.
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
  };

  // Function to show the next review.
  const getNextPerson = () => {
    // Increment currentItem and wrap around if it exceeds the array length.
    currentItem = (currentItem + 1) % reviews.length;
    // Call showPerson to update the display.
    showPerson();
  };

  // Function to show the previous review.
  const getPreviousPerson = () => {
    // Decrement currentItem and wrap around if it goes below 0.
    currentItem = (currentItem - 1 + reviews.length) % reviews.length;
    // Call showPerson to update the display.
    showPerson();
  };

  // Function to show a random review.
  const getRandomPerson = () => {
    // Set currentItem to a random index within the array length.
    currentItem = Math.floor(Math.random() * reviews.length);
    // Call showPerson to update the display.
    showPerson();
  };

  // Return an object containing the handler functions.
  return { getNextPerson, getPreviousPerson, getRandomPerson };
};

// Create a review handler instance.
const { getNextPerson, getPreviousPerson, getRandomPerson } =
  createReviewHandler();

// Add event listeners to the buttons using the handler functions.
nextBtn.addEventListener("click", getNextPerson);
prevBtn.addEventListener("click", getPreviousPerson);
randomBtn.addEventListener("click", getRandomPerson);

// Call getNextPerson on DOMContentLoaded to initialize the first display.
window.addEventListener("DOMContentLoaded", getNextPerson);
