const average = function (scores) {
  let averageScore = 0;
  scores.map((score, i) => {
    averageScore += score
  });
  return (Math.ceil(averageScore / scores.length));
}


const scores1 = [90, 98, 89, 100, 100, 86, 94];
console.log('\n-----------\n');
console.log(average(scores1));
console.log('\n-----------\n');
const scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));
console.log('\n-----------\n');