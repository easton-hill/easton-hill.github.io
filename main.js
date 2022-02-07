const WORD_LIST = ["CULLS", "PROSE", "BOORS"];
const MAX_GUESS = 6;

const guess = [];
let guessNum = 1;
let gameOver = false;

const getWord = () => {
  const baseline = new Date();
  baseline.setFullYear(2022, 1, 7);
  baseline.setHours(0, 0, 0, 0);

  const today = new Date();
  const milliseconds = today - baseline;
  const days = Math.floor(milliseconds / 24 / 60 / 60 / 1000);

  if (days < WORD_LIST.length) {
    return WORD_LIST[days];
  }
};

const analyzeMisplacedLetter = (index) => {
  const letter = guess[index];

  let wordOccurrences = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      wordOccurrences++;
    }
  }

  let [correctLetters, misplacedBefore] = [0, 0];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === letter) {
      if (guess[i] === word[i]) {
        correctLetters++;
      } else if (i < index && word.includes(guess[i])) {
        misplacedBefore++;
      }
    }
  }

  if (wordOccurrences - correctLetters - misplacedBefore > 0) {
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
    if (guess[i] === word[i]) {
      document.getElementById(`r${guessNum}c${i + 1}`).classList.add("correct");
      document.getElementById(guess[i]).classList.add("correct");
      correctLetters.push(guess[i]);
    } else if (word.includes(guess[i])) {
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

const word = getWord() || "ERROR";

const buttons = document.getElementsByClassName("key");
Array.from(buttons).forEach((btn) => btn.addEventListener("click", keyPress));

const closeBtn = document.getElementById("close-winner-display");
closeBtn.addEventListener("click", () => {
  document.getElementById("winner-display").style.visibility = "hidden";
});

const shareResults = () => {
  if (navigator.share) {
    navigator.share({
      text: `Word\n\n${guessNum}/6`,
    });
  }
};

const shareBtn = document.getElementById("share");
shareBtn.addEventListener("click", shareResults);
