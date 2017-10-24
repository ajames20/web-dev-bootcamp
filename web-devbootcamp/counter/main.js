const player1 = document.getElementById('player-1');
const player2 = document.getElementById('player-2');

const player1Score = document.getElementById('p1Display');
const player2Score = document.getElementById('p2Display');

const reset = document.getElementById('reset');
const round = document.getElementById('rounds');
const numInput = document.querySelector('input');

let gameOver = false;
let winningScore = 5;
let p1Score = 0;
let p2Score = 0;

player1.addEventListener('click', () => {
  if (!gameOver) {
    p1Score++;
    if (p1Score === winningScore) {
      gameOver = true;
      player1Score.classList.add('winner');
    }
  }
  player1Score.innerText = p1Score;
});

player2.addEventListener('click', () => {
  if (!gameOver) {
    p2Score++;
    if (p2Score === winningScore) {
      gameOver = true;
      player2Score.classList.add('winner');
    }
  }
  player2Score.innerText = p2Score;
});

numInput.addEventListener('change', () => {
  round.innerText = numInput.value;
  winningScore = Number(numInput.value);
  resetGame();
});

reset.addEventListener('click', () => {
  resetGame();
});

function resetGame() {
  player1Score.innerText = 0;
  player2Score.innerText = 0;

  player1Score.classList.remove('winner');
  player2Score.classList.remove('winner');

  gameOver = false;
  numInput.value = '';

  p1Score = 0;
  p2Score = 0;
}
