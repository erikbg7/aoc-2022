const fs = require('fs');
const fileName = process.argv[2];
const file = fs.readFileSync(fileName, 'utf8');

const SPECIAL_CHARS = {
  S: 'a'.charCodeAt(), 
  E: 'z'.charCodeAt()
}

const idx = (y, x) => `${y},${x}`;
const elevation = (c) => SPECIAL_CHARS[c] || c.charCodeAt();

const getSearchParams = () => {
  let grid, start_pos, end_pos;

  grid = file
    .split("\n")
    .map((r, y) => {
      return r
        .split('')
        .map((c, x) => {
          c === 'E' && (end_pos = [y, x]);
          c === 'S' && (start_pos = [y, x]);
          return elevation(c);
        })
      }
    );

  return [grid, start_pos, end_pos];
};

const findShortestPath = (grid, start_pos, end_pos) => {
  let queue = [[start_pos, 0]];

  const [endY, endX] = end_pos;
  const [startY, startX] = start_pos;
  const visited = new Set([idx(startY, startX)]);

  while (queue.length) {
    const item = queue.shift();
    const [[posY, posX], steps] = item;

    if (posX === endX && posY === endY) return steps;             // Check if we reached the end position

    [[0, 1], [0, -1], [1, 0], [-1, 0]]                            // Check all 4 directions
      .map(([dy, dx]) => ([posY + dy, posX + dx]))                // Map to new position
      .filter(([y, x]) => (grid[y]?.[x] !== undefined))           // Check if node is valid
      .filter(([y, x]) => (grid[y][x] <= grid[posY]?.[posX] + 1)) // Check if node is reachable
      .filter(([y, x]) => !visited.has(idx(y, x)))                // Check if node has been already visted
      .map(([y, x]) => {                                          // Add node to visited and enqueue
        visited.add(idx(y, x));
        queue.push([[y, x], steps + 1]);
      })
  }

  return Number.MAX_SAFE_INTEGER;
};



function solveFirstChallenge(input) {
  const params = getSearchParams(input);
  return findShortestPath(...params);
}

function solveSecondChallenge(input) {
  const params = getSearchParams(input);
  const [grid, _, end] = params;

  
  return grid
    .map((r, y) => 
      r.map((c, x) => [c, [y, x]]))                           // Map to [elevation, [posY, posX]]
    .flat()
    .filter(([c]) => c === "a".charCodeAt())                  // Filter lowest elevations
    .map(([_, start]) => findShortestPath(grid, start, end))  // Find shortest path for each start position
    .reduce((a, b) => Math.min(a, b));                        // Find minimum path  
  }

  console.log(solveFirstChallenge(file)); // 462
  console.log(solveSecondChallenge(file)); // 451
