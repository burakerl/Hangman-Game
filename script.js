const letter = document.querySelectorAll(".letters");
const whiteDiv = document.querySelectorAll(".white-div");
const wrongLetters = document.querySelector(".wrong-letters");
const warningMsg = document.querySelector(".warning-message");
const lostText = document.querySelector(".lost-text");
const lostMessage = document.querySelector(".lost-message");
const againBtn = document.querySelector(".play-again-btn");
const gameArea = document.querySelector(".card");
/*---------------------------------------------------------------*/
let word = "";
let playerInput = "";
let enteredLetters = "";
let foundLetters = [];
let wrongLettersArray = [];
let hp = 6;
// wrong input counter for img
let counter = 0;

async function getWord() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?length=6",
  );
  const word = await response.json();
  return word[0].split("");
}

async function startGame() {
  word = await getWord();
  document.body.addEventListener("keypress", (event) => {
    playerInput = event.key;
    checkLetters();
  });
}

function checkLetters() {
  checkHp();
  if (enteredLetters.includes(playerInput)) {
    displayWarning();
  } else if (!enteredLetters.includes(playerInput)) {
    enteredLetters += playerInput;
  }
  for (let i = 0; i < 6; i++) {
    letter[i].textContent = word[i];
  }
  for (let i = 0; i < 6; i++) {
    if (playerInput === letter[i].textContent) {
      letter[i].style.color = "red";
      foundLetters[i] = letter[i].textContent;
    }
  }
  if (foundLetters.toString() === word.toString()) {
    lostMessage.style.display = "block";
    lostMessage.style.backgroundColor = "green";
    lostText.innerHTML = "Congratulations!";
    gameArea.style.opacity = "0.5";
  }

  if (wrongLetters.textContent.includes(playerInput)) {
    displayWarning();
    return;
  } else if (!word.includes(playerInput)) {
    wrongLettersArray.push(playerInput);
    wrongLetters.textContent = wrongLettersArray.join(", ");
    whiteDiv[counter].style.backgroundColor = "unset";
    counter++;
  }
}

function checkHp() {
  if (!word.includes(playerInput) && !enteredLetters.includes(playerInput)) {
    hp--;
  }
  if (hp === 0) {
    lostMessage.style.display = "block";
    gameArea.style.opacity = "0.5";
    word = word.join("");
    lostText.innerHTML = `You lost! The Word Was: "${word.toUpperCase()}"`;
  }
}

function displayWarning() {
  warningMsg.style.display = "block";
  setTimeout(() => {
    warningMsg.style.display = "none";
  }, 2000);
}

startGame();

againBtn.addEventListener("click", () => {
  window.location.reload();
});
