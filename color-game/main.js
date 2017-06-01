let numSquares = 6;
let colors = getnerateRandomColors(numSquares);
const squares = document.querySelectorAll('.square');
const messageDisplay = document.getElementById('message');
const colorDisplay = document.getElementById('color-display');
const resetButton = document.getElementById('reset');
const easyButton = document.querySelector('#easyBtn');
const hardButton = document.querySelector('#hardBtn');
const h1 = document.querySelector('h1');
let pickedColor = pickColor();
colorDisplay.textContent = pickedColor;

for (let i = 0; i < squares.length; i++) {
  squares[i].style.background = colors[i];
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
      this.style.background = '#232323';
    }
  });
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
  colors = getnerateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.background = colors[i];
    //Add click event listner
  }
  h1.style.background = '#232323';
  resetButton.textContent = 'New Colors';
});

easyButton.addEventListener('click', () => {
  easyButton.classList.add('selected');
  hardButton.classList.remove('selected');
  numSquares = 3;
  colors = getnerateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
});

hardButton.addEventListener('click', () => {
  hardButton.classList.add('selected');
  easyButton.classList.remove('selected');
  numSquares = 6;
  colors = getnerateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.background = colors[i];
    squares[i].style.display = 'block';
  }
});
