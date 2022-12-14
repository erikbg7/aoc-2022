const fs = require("fs")
const fileName = process.argv[2]
const file = fs.readFileSync(fileName, "utf8")  

// Checks if a coordinate is out of the boundaries
function outOfBoundaries(coord, boundaries){
  const [x, y] = coord;
  const { maxX, minX, maxY, minY } = boundaries;
  return x > maxX || x < minX || y > maxY || y < minY;
}

// Checks if the origin source is blocked
function blockedSurface(coord, source) {
  const [x, y] = coord;
  const [x2, y2] = source;
  return x === x2 && y === y2;
}

// Returns a resting point for the given coordinate 
// or null if it's out of boundaries
function cascade(coord, points, boundaries) {
  let restingPoint = coord;

  if(outOfBoundaries(coord, boundaries)) return null;
  
  const [x, y] = coord;
  const deltas = [[0, -1], [-1, -1] , [1, -1]];  
  const neighbours = deltas.map(([dx, dy]) => [x + dx, y + dy]);

  for(let i = 0; i < neighbours.length; i++) {
    const next = neighbours[i];
    if(!points[next.toString()]) {
      const newCoord = cascade(next, points, boundaries);
      restingPoint = newCoord;
      break;
    } 
    
    if(blockedSurface(coord, [500, 1])) return null;

  }
  return restingPoint;
}


// First Challenge Day 14
function solveFirstChallenge() {
  let sandPoints = {};
  const { points, boundaries } = parseInput(file);
  
  while(true) {
    const source = [500, 0];
    const newPoint = cascade(source, points, boundaries);
    
    if(!newPoint) break;
    
    points[newPoint.toString()] = newPoint;
    sandPoints[newPoint.toString()] = newPoint;
  }

  return Object.values(sandPoints).length;
}

// Second Challenge Day 14
function solveSecondhallenge() {
  let sandPoints = {};
  const { points, boundaries: b } = parseInput(file);
  const { minY, minX, maxX, maxY } = b;

  for(let i = -1000; i < 1000; i++) {
    points[[minX + i, minY -2].toString()] = [minX + i, minY -2];
  }
  
  const boundaries = { 
    maxY: maxY + 1,
    minY: minY - 2, 
    minX: minX - 1000, 
    maxX: maxX + 1000
  };
  
  while(true) {
    const source = [500, 1];
    const newPoint = cascade(source, points, boundaries);
    
    if(!newPoint) break;
    
    points[newPoint.toString()] = newPoint;
    sandPoints[newPoint.toString()] = newPoint;
  }
  
  return Object.values(sandPoints).length;
}


// Parse the input
function parseInput(input) {
  let points = {};
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = 0;
  let maxY = 0;

  let rocks = input
    .split("\n")
    .map(row => 
      row.split("->").map(coord => 
          coord.split(",").map(Number)
    ));

  rocks.forEach(rock => {
    rock.forEach((coord, i) => {
      const [x, y] = coord;
      const [x2, y2] = rock[i + 1] || [];

      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, -y);
      maxY = Math.max(maxY, -y);

      if(x2 && x !== x2) {
        const to = Math.max(x, x2);
        const from = Math.min(x, x2);
        for(let i = from; i <= to; i++) {
          points[[i, -y].toString()] = [i, -y];
        }
      }
      if(y2 && y !== y2) {
        const to = Math.max(y, y2);
        const from = Math.min(y, y2);
        for(let i = from; i <= to; i++) {
          points[[x, -i].toString()] = [x, -i];
        }
      }
    });
  });

  return { points, boundaries: { maxX, minX, maxY, minY } };
}


console.log(solveFirstChallenge()); // 1406
console.log(solveSecondhallenge()); // 20870
