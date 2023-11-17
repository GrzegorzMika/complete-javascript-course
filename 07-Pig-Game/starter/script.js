'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const setCurrentScore = function(player, score) {
  document.getElementById(`current--${player}`).textContent = score;
};

const setTotalScore = function(player, score) {
  document.getElementById(`score--${player}`).textContent = score;
};
const switchPlayer = function() {
  setCurrentScore(activePlayer, 0);
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const init = function() {

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  setCurrentScore(0, currentScore);
  setCurrentScore(1, currentScore);
  setTotalScore(0, scores[0]);
  setTotalScore(1, scores[1]);

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

btnRoll.addEventListener('click', function() {
  if (playing) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    if (diceRoll !== 1) {
      currentScore += diceRoll;
      setCurrentScore(activePlayer, currentScore);
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function() {
  if (playing) {
    scores[activePlayer] += currentScore;
    currentScore = 0;
    setCurrentScore(activePlayer, currentScore);
    setTotalScore(activePlayer, scores[activePlayer]);
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);