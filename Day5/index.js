const fs = require("fs")

const fileName = process.argv[2];
const file = fs.readFileSync(fileName, "utf8")
const lines = file.split(/\r?\n/);

let stacks = [];

const getCargoStacks = (line) => {
  let count = 0;
  const pieces = line.split("")

  for(let i = 1; i < pieces.length; i += 4) {
    if(pieces[i] !== ' ' && !parseInt(pieces[i])) {
      stacks[count] = [pieces[i], ...stacks[count] || [] ]      
    }
    count++;
  }
}

const performCargoSteps9000 = (line) => {
    console.log(stacks)
    const [_, amount, __, from, ___, to ] = line.split(' ');
    for(let i = 0; i < parseInt(amount); i++) {
      const piece = stacks[parseInt(from) - 1].pop();
      stacks[parseInt(to) - 1].push(piece)
    }
}

const performCargoSteps9001 = (line) => {
  console.log(stacks)
  const [_, amount, __, from, ___, to ] = line.split(' ');
  let multipleStacks = []
  for(let i = 0; i < parseInt(amount); i++) {
    const piece = stacks[parseInt(from) - 1].pop();
    multipleStacks.push(piece)
  }
  stacks[parseInt(to) - 1] = [...stacks[parseInt(to) - 1], ...multipleStacks.reverse()]
}

const solveFirstChallenge = () => {
  for(let i = 0; i < lines.length; i++) {
    const line = lines[i];
    line.startsWith("move") ? performCargoSteps9000(line) : getCargoStacks(line)
  }
  return stacks.map(s => s.reverse()[0]).join('')
}

const solveSecondChallenge = () => {
  for(let i = 0; i < lines.length; i++) {
    const line = lines[i];
    line.startsWith("move") ? performCargoSteps9001(line) : getCargoStacks(line)
  }
  return stacks.map(s => s.reverse()[0]).join('')
}

console.log(solveFirstChallenge()) // VRWBSFZWM
stacks = [];

console.log(solveSecondChallenge()) // RBTWJWMCF
stacks = [];