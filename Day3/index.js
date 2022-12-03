const fs = require("fs")

const fileName = process.argv[2];
const file = fs.readFileSync(fileName, "utf8");
const lines = file.split(/\r?\n/);

function getItemPriority(char) {
  const code = char.charCodeAt(0);
  return code > 96 ? code - 96 : code - 38;
}

function solveFirstChallenge() {
  let sum = 0;
  lines.forEach(line => {
    const items = line.split('')
    const a = items.slice(0, items.length / 2)
    const b = items.slice(items.length / 2, items.length)

    const match = a.find(item => b.includes(item));
    sum += getItemPriority(match);
  })
  return sum;
}

function solveSecondChallenge() {
  let sum = 0;

  for(let i = 0; i < lines.length; i += 3) {
    const items_1 = lines[i].split('');
    const items_2 = lines[i + 1].split('');
    const items_3 = lines[i + 2].split('');

    const match = items_2.filter(item2 => items_1.includes(item2) && items_3.includes(item2));
    sum += getItemPriority(match[0]);
  }
  return sum;
}


console.log(solveFirstChallenge()); // 7997
console.log(solveSecondChallenge()); // 2545