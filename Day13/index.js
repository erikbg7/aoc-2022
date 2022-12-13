const fs = require("fs")
const fileName = process.argv[2]
const file = fs.readFileSync(fileName, "utf8")
    
const pairs = file
  .toString()
  .split('\n\n')
  .map(set => set
    .split('\n')
    .map(package => JSON.parse(package)))


function compare(left, right) {
  if(Array.isArray(left) || Array.isArray(right)) {

    !Array.isArray(left) && (left = [left]);
    !Array.isArray(right) && (right = [right]);

    for (var i = 0; i < Math.min(left.length,right.length); i++){
      const result = compare(left[i],right[i]);
      if (result !== 0) {
        return result;
      }
    }
    return left.length - right.length
  } else {
    return left - right;
  }
}



function solveFirstChallenge() {
  return pairs
    .map(p => compare(p[0], p[1]))
    .map((val, i) => val > 0 ? 0 : i+1)
    .reduce((acc, a) => (acc + a), 0);
}

function solveSecondChallenge() {
  return pairs
    .concat([[[[2]],[[6]]]])
    .flat()
    .sort((a, b) => compare(a, b))
    .map(a =>a.toString())
    .reduce((acc, v, i) => {
      return (v === '2' || v === '6') 
        ? acc * (i + 1) 
        : acc;
    }, 1);
}

console.log(solveFirstChallenge()); // 5529
console.log(solveSecondChallenge());  // 27690