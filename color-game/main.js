let numSquares = 6;
let colors = [];
let pickedColor;

const squares = document.querySelectorAll('.square');
const messageDisplay = document.getElementById('message');
const colorDisplay = document.getElementById('color-display');
const resetButton = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode');
const h1 = document.querySelector('h1');

init();

function init() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons() {
  //Mode Buttons event listeners
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function() {
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      this.classList.add('selected');
      this.textContent === 'easy' ? (numSquares = 3) : (numSquares = 6);

      reset();
    });
  }
}

function setUpSquares() {
  for (let i = 0; i < squares.length; i++) {
    //Add click event listner
    squares[i].addEventListener('click', function() {
      // arrow function breaks event listner for
      let clickedColor = this.style.background;

      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'Winner';
        h1.style.background = clickedColor;
        resetButton.textContent = 'Play again?';
        changeColors(clickedColor);
      } else {
        messageDisplay.textContent = 'Try Again';
        this.style.background = '#fff';
      }
    });
  }
}

function reset() {
  colors = getnerateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
  h1.style.background = 'steelblue';
  messageDisplay.textContent = '';
  resetButton.textContent = 'New Colors';
}

function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}

function pickColor(params) {
  let randomColor = Math.floor(Math.random() * colors.length);
  return colors[randomColor];
}

function getnerateRandomColors(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

resetButton.addEventListener('click', () => {
  reset();
});
