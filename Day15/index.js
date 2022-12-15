const fs = require("fs")
const fileName = process.argv[2]
const file = fs.readFileSync(fileName, "utf8")

// Another nice way to parse the input would be to use a regex
// const regexp = /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;
// const match = line.match(regexp).groups;

function getDistance(coord1, coord2) {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;
  return Math.abs(x1-x2) + Math.abs(y1-y2);
}

function parseInput(input) {
  let sensors = [];
  input.split("\n").forEach((line) => {
    const data = line
      .replace("Sensor at ", "")
        .replace(": closest beacon is at ", "")
        .split(/[\x,y=\s]/g)
        .filter(Boolean)
        .map(Number);

    sensors.push({
      x: data[0],
      y: data[1],
      beacon: { x: data[2], y: data[3] },
      dist: getDistance([data[0], data[1]], [data[2], data[3]]),
    })
  });
  return sensors;
}

function getMergedRanges(ranges) {
  ranges.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let prev = ranges[0];

  for (let i = 0; i < ranges.length; i++) {
      let curr = ranges[i];
      if (prev[1] >= curr[0] - 1) {
          prev = [prev[0], Math.max(prev[1], curr[1])];
      } else {
          merged.push(prev);
          prev = curr;
      }
  }

  merged.push(prev);
  return merged;
}

const getRange = (sensors, y) => {
  const intervals = [];
  for (const s of sensors) {
    const rangeW = s.dist - Math.abs(s.y - y);
    if (rangeW >= 0) { 
      const sensorRange = [s.x - rangeW, s.x + rangeW];
      intervals.push(sensorRange);
    }
  }
  return intervals;
};

function solveFirstChallenge(input, y) {  
  let validX = {}

  const sensors = parseInput(input)
  const reachableSensors = sensors.filter(s => (Math.abs(s.y - y) - s.dist) <= 0);
  const invalidX = reachableSensors.filter(s => s.beacon.y === y).map(s => s.beacon.x);
  
  reachableSensors.forEach(s => {
    const dy = Math.abs(s.y - y);
    const minX = s.x - (s.dist - dy);
    const maxX = s.x + (s.dist - dy);
    
    for (let i = minX; i <= maxX; i++) {
      !invalidX.includes(i) && (validX[i] = i);
    }
  });
  
  return Object.values(validX).length;
}


function solveSecondChallenge(input, limitY) {
  const sensors = parseInput(input);

  for (let y = 0; y <= limitY; y++) {
      const ranges = getRange(sensors, y);
      const mergedRanges = getMergedRanges(ranges);
      if (mergedRanges.length > 1) {
          return (mergedRanges[0][1] + 1) * 4000000 + y;
      }
  }

}





// console.log(solveFirstChallenge(file, 10)); // Test -> 26
console.log(solveFirstChallenge(file, 2000000)); // 4876693
// console.log(solveSecondChallenge(file, 20)); // Test -> 56000011
console.log(solveSecondChallenge(file, 4000000)); // 11645454855041









