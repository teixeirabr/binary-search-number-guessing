let max = 100;
let min = 1;
let nGuesses = 0;
let currGuess = 0;

const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");
const higherBtn = document.querySelector("#higherBtn");
const lowerBtn = document.querySelector("#lowerBtn");
const startBtn = document.querySelector("#startBtn");
const guessBtn = document.querySelector("#guessBtn");
const instructions = document.querySelector("#instructions");
const resetBtn = document.querySelector("#reset");
const initInstructions = instructions.innerText;

startBtn.addEventListener("click", tryGuess);
yesBtn.addEventListener("click", () => isGuessCorrect(true));
noBtn.addEventListener("click", () => isGuessCorrect(false));
higherBtn.addEventListener("click", () => numIsHigher(true));
lowerBtn.addEventListener("click", () => numIsHigher(false));

toggleBtns([startBtn], true);

function nonSensicalAnswer() {
  instructions.textContent =
    "Ooopss...too many tries. Your guess must be between 1-100. Try again";
  toggleBtns([resetBtn], true);
  toggleBtns([higherBtn, lowerBtn], false);
}

function tryGuess() {
  if (!nGuesses) {
    toggleBtns([startBtn], false);
    toggleBtns([guessBtn], true);
  }
  nGuesses++;
  currGuess = Math.floor((max - min) / 2) + min;
  console.log(
    `Guessing between ${min} and ${max} - guessing ${currGuess} - this is guess number ${nGuesses}`
  );
  guessBtn.textContent = currGuess + "!";
  instructions.textContent = "Am I correct?";
  toggleBtns([yesBtn, noBtn], true);
}

function toggleBtns(btnsArray, on) {
  for (let btn = 0; btn < btnsArray.length; btn++) {
    if (on) {
      btnsArray[btn].style.display = "inline-block";
    } else {
      btnsArray[btn].style.display = "none";
    }
  }
}

function isGuessCorrect(correct) {
  toggleBtns([yesBtn, noBtn, resetBtn], false);
  if (correct) {
    instructions.textContent = `I guessed your number in ${nGuesses} tries!`;
    toggleBtns([resetBtn], true);
  } else {
    toggleBtns([higherBtn, lowerBtn], true);
    instructions.textContent = `Is your number higher or lower than ${currGuess}?`;
  }
}

function numIsHigher(higher) {
  if (higher) {
    min = currGuess + 1;
    console.log("Changing the minimum to: " + min);
  } else {
    max = currGuess - 1;
    console.log("Changing the maximum to: " + max);
  }
  toggleBtns([higherBtn, lowerBtn], false);

  if (currGuess > 1 && currGuess <= 100) {
    tryGuess();
  } else {
    nonSensicalAnswer();
  }
}

function resetGame() {
  instructions.textContent =
    "Think of a number between 1-100 and click the blue button when you're ready.";
  toggleBtns([yesBtn, noBtn, resetBtn, guessBtn], false);
  toggleBtns([startBtn], true);
  nGuesses = 0;
  currGuess = 0;
  max = 100;
  min = 1;
}

resetBtn.addEventListener("click", resetGame);
