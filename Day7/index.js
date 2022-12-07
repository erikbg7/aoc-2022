
const fs = require("fs")
const fileName = process.argv[2]
const file = fs.readFileSync(fileName, "utf8")
const lines = file.split(/\r?\n/)

let loc = ['/']
let dirs = {}

function changeDirctory (dir) {
  dir === '..' ? loc.pop() : loc.push(dir)
}

function listDirectory () {
  dirs[loc.join('/')] = { dirs: [], size: 0 }
}

function performActions(line) {
  const pieces = line.split(" ")
  if(line.startsWith("$")) {
    const [_, cmd, dir] = pieces;
    const COMMANDS = {'cd': changeDirctory, 'ls': listDirectory};
    COMMANDS[cmd](dir)
    
  } else if (line.startsWith("dir")){
    const [_, dirname] = pieces;
    const current = dirs[loc.join('/')];
    current.dirs = [...current.dirs, [...loc, dirname].join('/')]

  } else {
    const [size, _filename] = pieces;
    const current = dirs[loc.join('/')];
    current.size = current.size + parseInt(size)
  }
}

function getDirSize(dir) {
  let size = dir.size;
  dir.dirs.forEach(dir => (size += getDirSize(dirs[dir])))
  return size;
}

function solveFirstChallenge() {
  return Object.entries(dirs).reduce((acc, [_dir, data]) => {
    const dirSize = getDirSize(data || {})
    const value = dirSize < 100000 ? dirSize : 0
    return acc + value
  }, 0)
} 

function solveSecondChallenge() {
  const ROOT_SIZE = getDirSize(dirs["///"])
  const MIN_REQUIRED_SIZE = 30000000 - (70000000 - ROOT_SIZE)
  
  let choice = Number.MAX_VALUE;
  Object.entries(dirs).forEach(([_dir, data]) => {
    const dirSize = getDirSize(data || {});
    if(dirSize > MIN_REQUIRED_SIZE) {
      choice = Math.min(choice, dirSize)
    }
  })
  return choice;
}

lines.forEach(performActions);
console.log(solveFirstChallenge()) //  1182909
console.log(solveSecondChallenge()) //  2832508