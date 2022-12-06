const fs = require("fs")

const fileName = process.argv[2];
const file = fs.readFileSync(fileName, "utf8");

function findUniqueWindow(size) {
  let index = 0;
  const chars = file.split('');
  for(let i = 0; i< chars.length; i++) {
    const markers = chars.slice(i, i+size)
    const unique = new Set(markers)
    if(unique.size === size) {
      index = i+size;
      break;
    }
  }
  return index
}

console.log(findUniqueWindow(4)) // 1300
console.log(findUniqueWindow(14)) // 3986
