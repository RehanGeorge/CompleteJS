'use strict';

let tempScore = 0;
const diceElement = document.querySelector('.dice');
const player1Element = document.querySelector('.player--0');
const player2Element = document.querySelector('.player--1');
const player1CurrentScore = document.querySelector('#current--0');
const player2CurrentScore = document.querySelector('#current--1');
const player1TotalScore = document.querySelector('#score--0');
const player2TotalScore = document.querySelector('#score--1');
let scores = [0, 0];
let activePlayer = 0;
let playing = true;

// Function to change the score of Player 1
const player1Score = function (score) {
  document.querySelector('#score--0').textContent = score;
};

// Function to change the score of Player 2
const player2Score = function (score) {
  document.querySelector('#score--1').textContent = score;
};

// Function to Switch Player
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  tempScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1Element.classList.toggle('player--active');
  player2Element.classList.toggle('player--active');
};

// Function to start the game
const startGame = function () {
  player1Score(0);
  player2Score(0);
  diceElement.classList.add('hidden');
  player1Element.classList.remove('player--winner');
  player2Element.classList.remove('player--winner');
  player1Element.classList.add('player--active');
  player2Element.classList.remove('player--active');
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  scores = [0, 0];
  tempScore = 0;
  playing = true;
};

// Event Listener for 'New Game' Button
document.querySelector('.btn--new').addEventListener('click', startGame);

// Event Listener for 'Roll Dice' Button
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (!playing) return;
  // Generate a random dice roll
  const dicevalue = Math.trunc(Math.random() * 6) + 1;
  // Display the dice
  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${dicevalue}.png`;
  // Check for rolled 1
  if (dicevalue !== 1) {
    // Add dice to current score
    tempScore += dicevalue;
    document.querySelector(`#current--${activePlayer}`).textContent = tempScore;
  } else {
    // Switch to next player
    switchPlayer();
  }
});

// Event Listener for 'Hold' Button
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (!playing) return;
  // Add current score to active player's score
  scores[activePlayer] += tempScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  // Check if player's score is >= 100
  if (scores[activePlayer] >= 100) {
    // Finish the game
    playing = false;
    diceElement.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceElement.classList.add('hidden');
  } else {
    // Switch to next player
    switchPlayer();
  }
});
