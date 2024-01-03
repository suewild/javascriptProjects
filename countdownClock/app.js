// Arrays holding names of months and weekdays.
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Selecting HTML elements for displaying countdown and giveaway information.
const deadline = document.querySelector(".deadline");
const giveaway = document.querySelector(".giveaway");
const items = document.querySelectorAll(".deadline-format h4");

// Setting a specific future date for the countdown.
// Format: year, month (0-indexed), day, hour, minutes, seconds
let futureDate = new Date(2024, 4, 24, 11, 30, 0);

// Extracting and formatting date components from the futureDate.
const year = futureDate.getFullYear(); // Gets the year
const hours = futureDate.getHours(); // Gets the hours
const minutes = futureDate.getMinutes(); // Gets the minutes
let month = futureDate.getMonth(); // Gets the month as a number
month = months[month]; // Converts month number to name
const date = futureDate.getDate(); // Gets the day of the month
let weekday = futureDate.getDay(); // Gets the weekday as a number
weekday = weekdays[weekday]; // Converts weekday number to name

// Displaying the formatted future date in the giveaway element.
giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

// Calculating the future time in milliseconds.
const futureTime = futureDate.getTime();

// Function to format numbers to two digits
function format(item) {
  if (item < 10) {
    return `0${item}`;
  }
  return item;
}

// Function to calculate and display the remaining time until the futureDate.
function getRemainingTime() {
  const today = new Date().getTime(); // Current time in milliseconds
  const remainingTime = futureTime - today; // Difference in time

  // Milliseconds conversions
  const millisecondsInOneDay = 24 * 60 * 60 * 1000;
  const millisecondsInOneHour = 60 * 60 * 1000;
  const millisecondsInOneMinute = 60 * 1000;

  // Calculating days, hours, minutes, and seconds remaining
  let days = Math.floor(remainingTime / millisecondsInOneDay);
  let hours = Math.floor(
    (remainingTime % millisecondsInOneDay) / millisecondsInOneHour
  );
  let minutes = Math.floor(
    (remainingTime % millisecondsInOneHour) / millisecondsInOneMinute
  );
  let seconds = Math.floor((remainingTime % millisecondsInOneMinute) / 1000);

  // Defining the values array with the calculated time components
  const values = [days, hours, minutes, seconds];

  // Updating the countdown display with the remaining time
  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  // Handling expiration of the countdown
  if (remainingTime < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry this giveaway has expired</h4>`;
  }
}

// Setting up the countdown interval and starting the countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
