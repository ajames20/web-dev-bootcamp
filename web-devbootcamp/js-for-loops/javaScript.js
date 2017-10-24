let num1 = -10;
console.log('Print all numbers between -10 and 19');
for (var i = num1; i < 20; i++) {
  console.log(i);
}

let num2 = 10;
console.log('Print all even numbers between 10 and 40');
for (var i = num2; i <= 40; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

let num3 = 300;
console.log('Print all odd numbers between 300 and 333');
for (var i = num3; i <= 333; i++) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}

let num4 = 5;
console.log('Print all numbers divisable by 5 AND 3 between 5 and 50');
for (var i = num4; i <= 50; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log(i);
  }
}
