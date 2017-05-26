//Print all numbers between -10 and 19
let num1 = -10;

while (num1 <= 19) {
  console.log(num1);
  num1++;
}
console.log('\n');

// Print all even numbers between 10 and 40
let num2 = 10;

while (num2 <= 40) {
  if (num2 % 2 === 0) {
    console.log(num2);
  }
  num2++;
}
console.log('\n');

// Print all odd numbers between 300 and 333
let num3 = 300;

while (num3 <= 333) {
  if (num3 % 2 !== 0) {
    console.log(num3);
  }
  num3++;
}
console.log('\n');

// Print all numbers divisable by 5 and 3 betwee 5 and 50
let num4 = 5;

while (num4 <= 50) {
  if (num4 % 3 === 0 && num4 % 5 === 0) {
    console.log(num4);
  }
  num4++;
}

//
let answer21 = prompt('Are we there yet?');

while (answer1 !== 'yes' && answer1 !== 'yeah') {
  answer1 = prompt('Are we there yet?');
}

alert('Yeah we made it');

// Version 2 using indexOF
let answer2 = prompt('Are we there yet?');

while (answer2.indexOf('yes') === -1) {
  answer2 = prompt('Are we there yet?');
}

alert('Yeah we made it');
