const fs = require("fs");

const fileName = process.argv[2];
const file = fs.readFileSync(fileName, 'utf-8');
const fileLines = file.split(/\r?\n/);

let maxCalories = 0;
let currentCalories = 0;

for (let i = 0; i < fileLines.length; i++) {
  if(!fileLines[i]) {
    maxCalories = Math.max(maxCalories, currentCalories);
    currentCalories = 0;
  }
  else {
    currentCalories += parseInt(fileLines[i]);
  }
}

console.log(maxCalories) // Output 74198
