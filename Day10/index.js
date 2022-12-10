const fs = require("fs");
const fileName = process.argv[2];
const file = fs.readFileSync(fileName, "utf8");
const signals = file.split('\n');

const CMD_2_CYCLES = {  
  noop: 1,  
  addx: 2 
}

function solveChallenge() {
  let cycle = 0;
  let register = 1;

  let CRT = '';
  let signalStrength = 0;

  function drawSignal() {
    const normalizedCycle = cycle % 40;
    const sprite = [register, register+1, register+2];
    sprite.includes(normalizedCycle) ? CRT += "#" : CRT += "."
    normalizedCycle === 0 && (CRT += "\n");
  }

  function evaluateStrength() {
    const shouldIncrement = cycle%40 === 20;
    shouldIncrement && (signalStrength += cycle * register);
  }

  signals.forEach(s => {
    const [cmd, value] = s.split(' ');
    const cycles = CMD_2_CYCLES[cmd];
    const registerValue = parseInt(value);

    for (let i = 0; i < cycles; i++) {
      cycle++;
      drawSignal()
      evaluateStrength()    
    }
    registerValue && (register += registerValue);
  });

  return {signalStrength, CRT};
}


const results = solveChallenge()
console.log(results.signalStrength);  // 13520
console.log(results.CRT);             // PGPHBEAB

// ###...##..###..#..#.###..####..##..###..
// #..#.#..#.#..#.#..#.#..#.#....#..#.#..#.
// #..#.#....#..#.####.###..###..#..#.###..
// ###..#.##.###..#..#.#..#.#....####.#..#.
// #....#..#.#....#..#.#..#.#....#..#.#..#.
// #.....###.#....#..#.###..####.#..#.###..