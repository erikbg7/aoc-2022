const fs = require("fs");
const fileName = process.argv[2];
const file = fs.readFileSync(fileName, "utf8");
const commands = file.split("\n");

const DIRECTIONS = {
  U: {y: 1, x: 0},
  D: {y: -1, x: 0},
  L: {y: 0, x: -1},
  R: {y: 0, x: 1},
}

function areAdjacent(knot1, knot2) {
  return Math.abs(knot2.x - knot1.x) <= 1 && Math.abs(knot2.y - knot1.y) <= 1;
}

function solveFirstChallenge() {
  const visitedCells = new Set();
  visitedCells.add("0,0");

  const head = { x: 0, y: 0 }
  const tail = { x: 0, y: 0 }

  commands.forEach(command => {
    const [direction, distance] = command.split(" ");
    
    for(let i = 0; i < parseInt(distance); i++) {
      const nextX = head.x + DIRECTIONS[direction].x;
      const nextY = head.y + DIRECTIONS[direction].y;
      
      if(!areAdjacent(tail, { x: nextX, y: nextY })) {
        tail.x = head.x;
        tail.y = head.y;
        visitedCells.add(`${tail.x},${tail.y}`);
      }
      
      head.x = nextX;
      head.y = nextY;
    }
  });  
  
  return visitedCells.size;
}


function solveSecondChallenge() {
  const visitedCells = new Set();
  visitedCells.add("0,0");

  const knots = new Array(10).fill(1).map(() => ({x: 0, y: 0}));

  commands.forEach(command => {
    const [direction, distance] = command.split(" ");
    
    for(let i = 0; i < parseInt(distance); i++) {
      for(let j = 0; j < knots.length; j++) {

        const isHead = j === 0;
        const isTail = j === (knots.length - 1);

        const leadingKnot = knots[j - 1];
        const currentKnot = knots[j];

        if(isHead) {
          knots[j].x += DIRECTIONS[direction].x;
          knots[j].y += DIRECTIONS[direction].y;
          continue;
        }

        if(!areAdjacent(currentKnot, leadingKnot)) {          
          const diffX = leadingKnot.x - currentKnot.x;
          const diffY = leadingKnot.y - currentKnot.y;

          knots[j].x += diffX/Math.abs(diffX) || 0;
          knots[j].y += diffY/Math.abs(diffY) || 0;
          
          if(isTail) {  
            visitedCells.add(`${currentKnot.x},${currentKnot.y}`);
          }
        } 
      }
    }
  });  
  return visitedCells.size;
}


console.log(solveFirstChallenge()); // 6209
console.log(solveSecondChallenge()); // 2460