const fs = require("fs");

const fileName = process.argv[2];
const file = fs.readFileSync(fileName, "utf8");
const matrix = file.split("\n").map(r => r.split('').map(s => parseInt(s)));

let visibleTrees = {};
let scenicScore = 0;

function isEdge(dir) {
  return dir === undefined;
}

function evaluateSurroundings(x, y, dist, eval, score) {
  const current = matrix[y][x]
  
  const top = matrix[y-dist]?.[x];
  const bottom = matrix[y+dist]?.[x];
  const left = matrix[y]?.[x-dist];
  const right = matrix[y]?.[x+dist];
  
  const isVerticallyVisible = eval.t && isEdge(top) || eval.b && isEdge(bottom)
  const isHorizontallyVisible = eval.l && isEdge(left) || eval.r && isEdge(right)

  if(isVerticallyVisible || isHorizontallyVisible) {
    visibleTrees[`${x}-${y}`] = 1;
  }
  
  if(eval.t || eval.b || eval.l || eval.r) {
    const nextEvaluation = {
      t: !eval.t ? eval.t : current > top,
      b: !eval.b ? eval.b : current > bottom,
      l: !eval.l ? eval.l : current > left,
      r: !eval.r ? eval.r : current > right,
    }
    
    const newScore = {
      t: score.t + ( !isEdge(top) && eval.t ? 1 : 0),
      b: score.b + ( !isEdge(bottom) && eval.b ? 1 : 0),
      l: score.l + ( !isEdge(left) && eval.l ? 1 : 0),
      r: score.r + ( !isEdge(right) && eval.r ? 1 : 0),
    }

    return evaluateSurroundings(x, y, dist + 1, nextEvaluation, newScore)
  }
  return score;
}


function solveChallenge() {
  for(let y = 0; y < matrix.length; y++) {
    for(let x = 0; x < matrix[y].length; x++) {
      const evaluation = {t: true, b: true, l: true, r: true};
      const initialScore = {t: 0, b: 0, l: 0, r: 0};
      const score = evaluateSurroundings(x, y , 1, evaluation, initialScore);

      scenicScore = Math.max(scenicScore, score.t * score.b * score.l * score.r);
    }
  }
  return {
    scenicScore, 
    visible: Object.values(visibleTrees).length
  };
}

console.log(solveChallenge()); // 1681 visible, 201684 scenic score