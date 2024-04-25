// script.js
const minNumber = 1;
const maxNumber = 100;
let secretNumber;
let attempts = 0;
let score = 0;

function generateSecretNumber() {
  secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

function checkGuess() {
  const guessInput = document.getElementById('guessInput');
  const feedback = document.getElementById('feedback');
  const attemptsDisplay = document.getElementById('attempts');
  const guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < minNumber || guess > maxNumber) {
    feedback.textContent = 'Please enter a valid number between 1 and 100.';
  } else {
    attempts++;
    attemptsDisplay.textContent = attempts;

    if (guess === secretNumber) {
      feedback.textContent = 'Congratulations! You guessed the correct number!';
      score++;
      updateScore(score);
      saveScore(score);
      updateLeaderboard();
    } else if (guess < secretNumber) {
      feedback.textContent = 'Too low! Try a higher number.';
    } else {
      feedback.textContent = 'Too high! Try a lower number.';
    }
  }
}

function resetGame() {
  generateSecretNumber();
  document.getElementById('guessInput').value = '';
  document.getElementById('feedback').textContent = '';
  attempts = 0;
  document.getElementById('attempts').textContent = attempts;
  score = loadScore();
}

function saveScore(score) {
  localStorage.setItem('guessTheNumberScore', score);
}

function loadScore() {
  const savedScore = localStorage.getItem('guessTheNumberScore');
  return savedScore ? parseInt(savedScore) : 0;
}

function updateScore(newScore) {
  document.getElementById('score').textContent = newScore;
  
}

function updateLeaderboard() {
  const topScoresElement = document.getElementById('topScores');
  topScoresElement.innerHTML = '';

  
  const scores = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('guessTheNumberScore')) {
      const score = parseInt(localStorage.getItem(key));
      scores.push(score);
    }
  }


  scores.sort((a, b) => a - b);

  
  scores.slice(0, 10).forEach((score, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `#${index + 1}: ${score} attempts`;
    topScoresElement.appendChild(listItem);
  });
}


window.onload = function() {
  generateSecretNumber();
  score = loadScore();
};
