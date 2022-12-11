const fs = require("fs")
const fileName = process.argv[2];
const file = fs.readFileSync(fileName, "utf8");

let monkeys = [];

// Load the monkeys information from the file
function getMonkeysInformation() {
  monkeys = [];
  file.split("\n\n").forEach((data) => {
    const [_, it, fn, c, trueC, falseC] = data.split("\n");
    
    monkeys.push({
      inspected: 0,
      items: it.split(":")[1].trim().split(","),
      worryFn: fn.split("=")[1].trim(),
      sendCondition: parseInt(c.split("by")[1].trim()),
      monkeyTrue: parseInt(trueC.split("monkey")[1].trim()),
      monkeyFalse: parseInt(falseC.split("monkey")[1].trim()),
    })
  });
}

// Perform the round of monkeys interactions
function evaluateMonkeys(worrySmootherFn) {
  for(let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i];
    for(let it of monkey.items) {
      monkey.inspected++;;
      const expression = monkey.worryFn.replaceAll("old", it);
      const item = worrySmootherFn(eval(expression));
      
      item % monkey.sendCondition === 0
      ? monkeys[monkey.monkeyTrue].items.push(item)
      : monkeys[monkey.monkeyFalse].items.push(item);
    }
    monkey.items = [];
  };
}

// Solve the problem given a smoothing function and a number of rounds
function solveChallenge(worrySmootherFn, round) {
  for(let i = 0; i < round; i++) {
    evaluateMonkeys(worrySmootherFn);
  }

  const [m1, m2] = monkeys.sort((a, b) => b.inspected - a.inspected);
  return m1.inspected * m2.inspected;
}


// Challenge 1
getMonkeysInformation();
const fn1 = (expr) => Math.floor(expr/3);
console.log(solveChallenge(fn1, 20));
  
// Challenge 1
// We use the product of the monkeys conditions as a module to
// reduce the elevated worry level
getMonkeysInformation()
const fn2 = (expr) => expr%monkeys.map(m => m.sendCondition).reduce((a, b) => a * b, 1);
console.log(solveChallenge(fn2, 10000));


