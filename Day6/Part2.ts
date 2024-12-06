const text = await Deno.readTextFile("Input.txt");
const ogMap = text.split("\n").map((line) => line.split(""));

let startPos: [number, number] = [-1, -1];
let startDir: [number, number] = [0, 0];
ogMap.forEach((line, y) => {
  line.forEach((elem, x) => {
    if (elem != "." && elem != "#") {
      startPos = [x, y];
      switch (elem) {
        case "^":
          startDir = [0, -1];
          break;
        case ">":
          startDir = [1, 0];
          break;
        case "<":
          startDir = [-1, 0];
          break;
        case "v":
          startDir = [0, 1];
          break;
        default:
          break;
      }
    }
  });
});

function walkPath(pos : [number, number], dir : [number, number], map : string[][]) {
  const positions = new Set();
  while (true) {
    if(positions.has([pos, dir].toString())) {
      return true;
    }
    positions.add([pos, dir].toString());
    let newPos: [number, number] = [pos[0] + dir[0], pos[1] + dir[1]];

    if (
      !(newPos[0] < map[0].length && newPos[1] < map.length && newPos[0] >= 0 &&
        newPos[1] >= 0)
    ) {
      break;
    }
    while (map[newPos[1]][newPos[0]] === "#") {
      dir = [-dir[1], dir[0]];
      newPos = [pos[0] + dir[0], pos[1] + dir[1]];
    }

    pos = newPos;
  }

  return false;
}

let result = 0;
ogMap.forEach((line, y) => {
  line.forEach((elem, x) => {
    if (elem === ".") {
      const copyMap = JSON.parse(JSON.stringify(ogMap))
      copyMap[y][x] = "#"

      if(walkPath(startPos, startDir, copyMap)) {
        result += 1;
      }
    }
  });
});
console.log(result);
