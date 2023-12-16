const reviews = [
  {
    id: 1,
    name: "susan smith",
    job: "web developer",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    text: "I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed",
  },
  {
    id: 2,
    name: "anna johnson",
    job: "web designer",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
    text: "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen",
  },
  {
    id: 3,
    name: "peter jones",
    job: "intern",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    text: "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal",
  },
  {
    id: 4,
    name: "bill anderson",
    job: "the boss",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
];

// select items, author, job, info, prevBtn, nextBtn, randomBtn
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

// set starting item
let currentItem = 0;

// load initial item
window.addEventListener("DOMContentLoaded", function () {
  showPerson(currentItem);
});

function showPerson(person) {
  const item = reviews[person];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}

/** get next person
 * 1. increment currentItem
 * 2. if incremented currentItem is greater than reviews.length - 1,
 *    reset currentItem to 0
 *  When such as currentItem is in the global scope, it can be accessed
 *  anywhere in the code
 *  It can be modified anywhere in the code
 *  and the value can be retrieved without returning it -- IMPORTANT TO REMEMBER
 */

function getNextItem() {
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0; // go back to the first item
  }
}

function getPrevItem() {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1; // go back to the last item
  }
}

function getCurrentItem() {
  currentItem;
}

function getRandomItem() {
  return Math.floor(Math.random() * reviews.length); // generate a random number between 0 and 3
}

nextBtn.addEventListener("click", function () {
  const nextItem = getNextItem();
  showPerson(nextItem);
});

prevBtn.addEventListener("click", function () {
  const prevItem = getPrevItem();
  showPerson(prevItem);
});

randomBtn.addEventListener("click", function () {
  let randomReview = getRandomItem();
  if (randomReview === currentItem) {
    // If the random review is the same as the current one, move to the next item.
    getNextItem();
    showPerson(currentItem);
  } else {
    // If it's different, show the random review and update currentItem.
    currentItem = randomReview;
    showPerson(currentItem);
  }
});
