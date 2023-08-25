const easyAttempts = 20;
const mediumAttempts = 15;
const hardAttempts = 10;

let secretNumber, remainingAttempts, isGameWon;

function generateSecretNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function setMessage(message) {
  document.getElementById("message").textContent = message;
}

function updateAttempts() {
  document.getElementById("attempts").textContent = remainingAttempts;
}

function checkGuess(guess) {
  if (guess === secretNumber) {
    setMessage(`Parabéns! Você acertou o número ${secretNumber}!`);
    isGameWon = true;
    document.getElementById("restart").classList.remove("hidden");
    document.getElementById("check").disabled = true;
  } else if (guess < secretNumber) {
    setMessage("O número é maior.");
  } else {
    setMessage("O número é menor.");
  }
  remainingAttempts--;
  updateAttempts();
  
  if (remainingAttempts === 0 && !isGameWon) {
    setMessage(`Suas tentativas acabaram! O número era ${secretNumber}. Tente novamente.`);
    document.getElementById("restart").classList.remove("hidden");
    document.getElementById("check").disabled = true;
  }
}

function startGame(attempts) {
  secretNumber = generateSecretNumber();
  remainingAttempts = attempts;
  isGameWon = false;

  document.getElementById("easy").disabled = true;
  document.getElementById("medium").disabled = true;
  document.getElementById("hard").disabled = true;
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("restart").classList.add("hidden");
  document.getElementById("check").disabled = false;

  setMessage("");
  updateAttempts();
  document.getElementById("guess").value = "";
}

document.getElementById("easy").addEventListener("click", () => startGame(easyAttempts));
document.getElementById("medium").addEventListener("click", () => startGame(mediumAttempts));
document.getElementById("hard").addEventListener("click", () => startGame(hardAttempts));

document.getElementById("check").addEventListener("click", () => {
  const guess = parseInt(document.getElementById("guess").value);
  if (!isNaN(guess) && guess >= 1 && guess <= 100) {
    checkGuess(guess);
  } else {
    setMessage("Digite um número válido entre 1 e 100.");
  }
});

document.getElementById("restart").addEventListener("click", () => {
  document.getElementById("game").classList.add("hidden");
  document.getElementById("easy").disabled = false;
  document.getElementById("medium").disabled = false;
  document.getElementById("hard").disabled = false;
});
