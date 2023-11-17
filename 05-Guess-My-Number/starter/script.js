'use strict';

let secreteNumber = Math.trunc(Math.random() * 20);
let score = 20;
let highscore = 0;


document.querySelector('.check').addEventListener('click', function() {
  const guess = Number(document.querySelector('.guess').value);
  let message = document.querySelector('.message');
  let scoreView = document.querySelector('.score');

  function WrongGuess(msg) {
    score > 1 ? message.textContent = msg : message.textContent = 'Game Over';
    score--;
    scoreView.textContent = score;
  }

  if (!guess) {
    message.textContent = 'Please enter a number';
  } else if (guess === secreteNumber) {
    message.textContent = 'You Win!';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secreteNumber;
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess > secreteNumber) {
    WrongGuess('Too High');
  } else if (guess < secreteNumber) {
    WrongGuess('Too Low');
  }
});

document.querySelector('.again').addEventListener('click', function() {
  document.querySelector('.score').textContent = score = 20;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = secreteNumber;
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  secreteNumber = Math.trunc(Math.random() * 20);
});