// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Getting the level from select box
let selectLvl = document.querySelector("select");
// Default level
let defaultLevelName = "Easy";
let defaultLevelSeconds = 5;
selectLvl.addEventListener("change", () => {
  defaultLevelName = selectLvl.value;
  defaultLevelSeconds = lvls[selectLvl.value];
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
});

// Setting up level Name + Seconds + Score
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable paste event
input.onpaste = () => false;

// Start Game
startButton.addEventListener("click", function () {
  this.remove();
  input.focus();
  // Generate word function
  genWords();
});

function genWords() {
  // Get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];

  // Get word Index
  let wordIndex = words.indexOf(randomWord);

  // Remove word from array
  words.splice(wordIndex, 1);

  // Show the Random word
  theWord.innerHTML = randomWord;

  // Empty upcoming word
  upcomingWords.innerHTML = "";

  // Generate words
  for (let i = 0; i < words.length; i++) {
    // Create Div
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }

  // Start play function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;

  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    finishMessage.innerHTML = "";

    if (timeLeftSpan.innerHTML == 0) {
      // Stop timer
      clearInterval(start);
      // Compare words
      if (theWord.innerHTML.trim() == input.value) {
        // Empty the input field
        input.value = "";
        // Increase score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Game Successfully Finished");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming words box
          upcomingWords.remove();
        }
      } else {
        // Empty the input field
        input.value = "";
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        genWords();
      }
    }
  }, 1000);
}
