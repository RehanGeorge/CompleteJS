'use strict';

/*
const messageLabel = document.querySelector('.message');
const numberLabel = document.querySelector('.number');
const scoreLabel = document.querySelector('.score');
const guessLabel = document.querySelector('.guess');

console.log(messageLabel.textContent);

messageLabel.textContent = '🎉 Correct Number!';

numberLabel.textContent = 13;

scoreLabel.textContent = 10;
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const numberLabel = document.querySelector('.number');
const scoreLabel = document.querySelector('.score');
const againButton = document.querySelector('.again');
let highscoreLabel = document.querySelector('.highscore');

const checkButton = document.querySelector('.check');

checkButton.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (score > 1) {
    // When there is no input
    if (!guess) {
      displayMessage('⛔ No number!');
      // When player wins
    } else if (guess === secretNumber) {
      displayMessage('🎉 Correct Number!');
      numberLabel.textContent = secretNumber;
      if (score > highscore) {
        highscore = score;
        highscoreLabel.textContent = score;
      }

      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      // When guess is wrong
    } else if (guess !== secretNumber) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      scoreLabel.textContent = score;
    }
    // When player loses
  } else {
    scoreLabel.textContent = 0;
    displayMessage('💥 You lost the game!');
  }
});

// Reset button
/*
Implement a game rest functionality, so that the player can make a new guess!
Your tasks:
1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the 'score' and 
'secretNumber' variables
3. Restore the initial conditions of the message, number, score and guess input 
fields
4. Also restore the original background color (#222) and number width (15rem)
*/

againButton.addEventListener('click', function () {
  score = 20;
  scoreLabel.textContent = score;
  displayMessage('Start guessing...');
  numberLabel.textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
});
