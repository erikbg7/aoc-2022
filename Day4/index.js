const fs = require("fs")

const fileName = process.argv[2]
const file = fs.readFileSync(fileName, "utf8")
const lines = file.split(/\r?\n/)

function solveFirstChallenge() {
  let count = 0;
  for(let i = 0; i < lines.length; i++) {
    const [a, b] = lines[i].split(',')
    const [ai, af] = a.split('-').map(n => parseInt(n))
    const [bi, bf] = b.split('-').map(n => parseInt(n))
    
    if((ai <= bi && af >= bf) || (bi <= ai && bf >= af)) {
      count++
    }
  }
  return count;
}

function solveSecondChallenge() {
  let count = 0;
  for(let i = 0; i < lines.length; i++) {
    const [a, b] = lines[i].split(',')
    const [ai, af] = a.split('-').map(n => parseInt(n))
    const [bi, bf] = b.split('-').map(n => parseInt(n))
    
    if((ai <= bi && af >= bi) || (bi <= af && bf >= ai)) {
      count++
      continue
    }
  }
  return count;
}

console.log(solveFirstChallenge()) // 530
console.log(solveSecondChallenge()) // 530