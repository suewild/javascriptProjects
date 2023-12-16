// Initialize the count variable to 0.
let count = 0;

// Select the HTML element with the ID 'value'.
const value = document.querySelector("#value");

// Select all HTML elements with the class 'btn'. This returns a NodeList (similar to an array) of elements.
const btns = document.querySelectorAll(".btn");

// Iterate over each button in the btns NodeList.
btns.forEach(function (btn) {
  // Add a click event listener to each button.
  btn.addEventListener("click", function (e) {
    // Get the list of classes applied to the button that was clicked.
    const styles = e.currentTarget.classList;

    // Check if the clicked button has the class 'decrease'.
    if (styles.contains("decrease")) {
      count--; // Decrease the count by 1.
    } else if (styles.contains("increase")) {
      //// Check if the clicked button has the class 'decrease'.
      count++; // Increase the count by 1.
    } else {
      // If the clicked button has neither the 'decrease' nor the 'increase' class, it must be the reset button.
      count = 0; // Reset the count to 0 for any other button.
    }

    // Change the text color of the 'value' element based on the count value.
    if (count > 0) {
      value.style.color = "green"; // Set text color to green if count is positive.
    }
    if (count < 0) {
      value.style.color = "red"; // Set text color to red if count is negative.
    }
    if (count === 0) {
      value.style.color = "#222"; // Set text color to dark gray (#222) if count is zero.
    }

    // Update the 'value' element's text content with the current count.
    value.textContent = count;
  });
});
