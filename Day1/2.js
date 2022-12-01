const fs = require("fs");

const fileName = process.argv[2];
const file = fs.readFileSync(fileName, 'utf-8');
const fileLines = file.split(/\r?\n/);

let top3 = [0, 0, 0]
let currentCalories = 0;

for (let i = 0; i <= fileLines.length; i++) {
  if(!fileLines[i]) {
      if(currentCalories > top3[2]) {
        top3 = [...top3.splice(1,2), currentCalories]
        currentCalories = 0;
      } else if (currentCalories > top3[1]) {
        top3 = [top3[1], currentCalories, top3[2]]
        currentCalories = 0;
      }
      else {
        top3[0] = Math.max(top3[0], currentCalories);
        currentCalories = 0;
      }
  }
  else {
    currentCalories += parseInt(fileLines[i]);
  }
}


console.log(top3[0] + top3[1] + top3[2]) // Output 209914

