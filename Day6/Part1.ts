const text = await Deno.readTextFile("Input.txt");
const map = text.split("\n").map((line) => line.split(""));

let pos: [number, number] = [-1, -1];
let dir: [number, number] = [0, 0];
map.forEach((line, y) => {
  line.forEach((elem, x) => {
    if (elem != "." && elem != "#") {
      pos = [x, y];
      switch (elem) {
        case "^":
          dir = [0, -1];
          break;
        case ">":
          dir = [1, 0];
          break;
        case "<":
          dir = [-1, 0];
          break;
        case "v":
          dir = [0, 1];
          break;
        default:
          break;
      }
    }
  });
});

const positions = new Set();
while (true) {
  positions.add(pos.toString());
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

console.log(positions.size);
