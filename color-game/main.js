const colors = [
  'rgb(110, 131, 135)',
  'rgb(12, 202, 74)',
  'rgb(164, 184, 196)',
  'rgb(200, 211, 213)',
  'rgb(138, 132, 226)',
  'rgb(47, 37, 234)'
];

const squares = document.querySelectorAll('.square');
let messageDisplay = document.getElementById('message');

const colorDisplay = document.getElementById('color-display');
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
      changeColors(clickedColor);
    } else {
      messageDisplay.textContent = 'Try Again';
      this.style.background = '#232323';
    }
  });
}

function changeColors(color) {
  console.log('working');
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}

function pickColor(params) {
  let randomColor = Math.floor(Math.random() * colors.length);
}
