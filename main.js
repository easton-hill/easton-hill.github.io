const WORD = "FILCH";
const MAX_GUESS = 6;

const guess = [];
let guessNum = 1;

let gameOver = false;

const analyzeMisplacedLetter = (index) => {
  const letter = guess[index];

  let wordOccurrences = 0;
  for (let i = 0; i < WORD.length; i++) {
    if (WORD[i] === letter) {
      wordOccurrences++;
    }
  }

  let [correctLetters, misplacedBefore] = [0, 0];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === letter) {
      if (guess[i] === WORD[i]) {
        correctLetters++;
      } else if (i < index && WORD.includes(guess[i])) {
        misplacedBefore++;
      }
    }
  }

  if (
    wordOccurrences - correctLetters &&
    wordOccurrences - misplacedBefore > 0
  ) {
    document
      .getElementById(`r${guessNum}c${index + 1}`)
      .classList.add("misplaced");
  } else {
    document.getElementById(`r${guessNum}c${index + 1}`).classList.add("wrong");
  }
};

const tryGuess = () => {
  const correctLetters = [];
  let correct = true;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === WORD[i]) {
      document.getElementById(`r${guessNum}c${i + 1}`).classList.add("correct");
      document.getElementById(guess[i]).classList.add("correct");
      correctLetters.push(guess[i]);
    } else if (WORD.includes(guess[i])) {
      correct = false;
      analyzeMisplacedLetter(i);
      if (!correctLetters.includes(guess[i])) {
        document.getElementById(guess[i]).classList.add("misplaced");
      }
    } else {
      correct = false;
      document.getElementById(`r${guessNum}c${i + 1}`).classList.add("wrong");
      if (!correctLetters.includes(guess[i])) {
        document.getElementById(guess[i]).classList.add("wrong");
      }
    }
  }

  if (correct) {
    gameOver = true;
    document.getElementById("winner-display").style.visibility = "visible";
  } else {
    guess.length = 0;
    guessNum++;
    if (guessNum > MAX_GUESS) {
      gameOver = true;
    }
  }
};

const keyPress = (e) => {
  if (gameOver) {
    return;
  }

  const keyValue = e.target.id;
  switch (keyValue) {
    case "enter":
      if (guess.length === 5) {
        tryGuess();
      }
      break;
    case "backspace":
      if (guess.length) {
        document.getElementById(`r${guessNum}c${guess.length}`).innerText = "";
        guess.pop();
      }
      break;
    default:
      if (guess.length < 5) {
        guess.push(keyValue);
        document.getElementById(`r${guessNum}c${guess.length}`).innerText =
          keyValue;
      }
  }
};

const buttons = document.getElementsByClassName("key");
Array.from(buttons).forEach((btn) => btn.addEventListener("click", keyPress));

const closeBtn = document.getElementById("close-winner-display");
closeBtn.addEventListener("click", () => {
  document.getElementById("winner-display").style.visibility = "hidden";
});
