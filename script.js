'use strict';

let attempts, currentResult, secretNumber, bestResult;
let difficulty = 'easy';
let bestResultEasy = 10;
let bestResultMedium = 7;
let bestResultHard = 5;
let arr = [];

const highScoreEasy = document.querySelector('.highscore-easy');
const highScoreMedium = document.querySelector('.highscore-medium');
const highScoreHard = document.querySelector('.highscore-hard');

const check = document.querySelector('.check');
const previous = document.querySelector('.previous');

const mathFunc = num => Math.trunc(Math.random() * num) + 1;
const displayMessage = message => (document.querySelector('.message').textContent = message);
const displayNumber = number => (document.querySelector('.number').textContent = number);
const displayAttempts = attempts => (document.querySelector('.score').textContent = attempts);
const displayGuess = guess => (document.querySelector('.guess').value = guess);
const styleBody = body => (document.querySelector('body').style.backgroundColor = body);
const style = style => (document.querySelector('.number').style.width = style);

check.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  currentResult++;

  switch (true) {
    case !guess:
      attempts === 1 ? displayMessage('🚫 You lost the game!') : displayMessage('🔢 No number!');
      break;

    // Right guess
    case guess === secretNumber:
      displayNumber(secretNumber);
      displayMessage('🎉 Correct number!');
      styleBody('#60b347');
      style('30rem');

      if (currentResult <= bestResult) {
        bestResult = currentResult;

        if (difficulty === 'easy') {
          highScoreEasy.textContent = bestResult;
          bestResultEasy = bestResult;
        }
        if (difficulty === 'medium') {
          highScoreMedium.textContent = bestResult;
          bestResultMedium = bestResult;
        }
        if (difficulty === 'hard') {
          highScoreHard.textContent = bestResult;
          bestResultHard = bestResult;
        }
      }
      check.disabled = true;
      break;

    // Wrong guess
    case guess !== secretNumber:
      if (attempts > 1) {
        displayMessage(guess > secretNumber ? '📈 To high!' : '📉  To low!');
        attempts--;
        displayAttempts(attempts);
        arr.push(guess);
        previous.textContent = `Previous guesses: ${arr}`;
      } else {
        displayNumber(secretNumber);
        displayMessage('🚫 You lost the game!');
        styleBody('#f67905d0');
        displayAttempts(0);
        check.disabled = true;
      }
      break;
  }
});

const init = function (
  mode,
  tries = 10,
  bestScore = highScoreEasy.parentElement,
  highscore = bestResultEasy
) {
  [highScoreEasy, highScoreMedium, highScoreHard].forEach(
    el => (el.parentElement.style.visibility = 'hidden')
  );
  bestScore.style.visibility = 'visible';
  arr = [];
  previous.textContent = '';
  attempts = tries;
  bestResult = highscore;
  currentResult = 0;
  document.querySelector('.between').textContent = `(Between 1 and ${mode})`;
  check.disabled = false;
  secretNumber = mathFunc(mode);
  displayMessage('Start guessing...');
  displayAttempts(tries);
  displayNumber('?');
  displayGuess('');
  styleBody('#222');
  style('15rem');
};

init(25);

['.easy', '.medium', '.hard'].forEach(el =>
  document.querySelector(el).addEventListener('click', () => {
    if (el === '.easy') {
      difficulty = 'easy';
      init(25);
    }
    if (el === '.medium') {
      difficulty = 'medium';
      init(50, 7, highScoreMedium.parentElement, bestResultMedium);
    }
    if (el === '.hard') {
      difficulty = 'hard';
      init(100, 5, highScoreHard.parentElement, bestResultHard);
    }
  })
);

document.querySelector('.again').addEventListener('click', () => {
  difficulty === 'hard'
    ? init(100, 5, highScoreHard.parentElement, bestResultHard)
    : difficulty === 'medium'
    ? init(50, 7, highScoreMedium.parentElement, bestResultMedium)
    : init(25);
});
