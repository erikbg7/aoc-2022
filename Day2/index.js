const fs = require('fs');

const scores_1 = {
  "A X": 1 + 3,
  "A Y": 2 + 6,
  "A Z": 3 + 0,
  "B X": 1 + 0,
  "B Y": 2 + 3,
  "B Z": 3 + 6,
  "C X": 1 + 6,
  "C Y": 2 + 0,
  "C Z": 3 + 3
}

const scores_2 = {
  "A X": 0 + 3,
  "A Y": 3 + 1,
  "A Z": 6 + 2,
  "B X": 0 + 1,
  "B Y": 3 + 2,
  "B Z": 6 + 3,
  "C X": 0 + 2,
  "C Y": 3 + 3,
  "C Z": 6 + 1
}

function getTotalPoints(lines, scoring) {
  let sum = 0;
  for(let i = 0; i < lines.length; i++) {
    sum += scoring[lines[i]];
  }
  return sum;
}

const fileName = process.argv[2];
const file = fs.readFileSync(fileName, 'utf-8');
const fileLines = file.split(/\r?\n/);

const points_1 = getTotalPoints(fileLines, scores_1);
const points_2 = getTotalPoints(fileLines, scores_2);

console.log(points_1); // 11386
console.log(points_2); // 13600