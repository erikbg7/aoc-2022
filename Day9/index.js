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

function areAdjacent(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) <= 1 && Math.abs(y2 - y1) <= 1;
}

function solveChallenge() {
  const visitedCells = new Set();
  visitedCells.add("0,0");

  const head = { x: 0, y: 0 }
  const tail = { x: 0, y: 0 }

  commands.forEach(command => {
    const [direction, distance] = command.split(" ");
    
    for(let i = 0; i < parseInt(distance); i++) {
      const nextX = head.x + DIRECTIONS[direction].x;
      const nextY = head.y + DIRECTIONS[direction].y;
      
      if(!areAdjacent(tail.x, tail.y, nextX, nextY)) {
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

console.log(solveChallenge()); // 6209