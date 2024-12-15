const text = await Deno.readTextFile("Input.txt");
const splitText: string[] = text
  .split("\n\n");

let warehouse = splitText[0].split("\n").map((elem) => elem.split(""));
const moves = splitText[1].split("").filter((elem) => elem !== "\n");

const wareMap: Record<string, [string, string]> = {
  "#": ["#", "#"],
  "O": ["[", "]"],
  ".": [".", "."],
  "@": ["@", "."],
};

warehouse = warehouse.map((line) => line.flatMap((c) => wareMap[c]));

let robotsPos: [number, number] = [0, 0];
warehouse.forEach((line, y) => {
  const x = line.findIndex((char) => char === "@");
  if (x > 0) {
    warehouse[y][x] = ".";
    robotsPos = [x, y];
  }
});

const moveMap: Record<string, [number, number]> = {
  "^": [0, -1],
  "v": [0, 1],
  ">": [1, 0],
  "<": [-1, 0],
};

function sumVec(
  vec1: [number, number],
  vec2: [number, number],
): [number, number] {
  return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
}

function flipVec(vec1: [number, number]): [number, number] {
  return [vec1[0] * -1, vec1[1] * -1];
}

function compVec(vec1: [number, number], vec2: [number, number]): boolean {
  return vec1[0] === vec2[0] && vec1[1] === vec2[1];
}

function moveBoxes(pos: [number, number], dir: [number, number]): boolean {
  if (dir[0] !== 0) {
    let tmpPos = sumVec(pos, dir);
    while (
      warehouse[tmpPos[1]][tmpPos[0]] === "[" ||
      warehouse[tmpPos[1]][tmpPos[0]] === "]"
    ) {
      tmpPos = sumVec(tmpPos, dir);
    }
    if (warehouse[tmpPos[1]][tmpPos[0]] === ".") {
      while (!compVec(tmpPos, pos)) {
        warehouse[tmpPos[1]][tmpPos[0]] =
          warehouse[tmpPos[1] - dir[1]][tmpPos[0] - dir[0]];
        tmpPos = sumVec(tmpPos, flipVec(dir));
      }
      robotsPos = pos;
      return true;
    }
    return false;
  }

  if (warehouse[pos[1]][pos[0]] === "]") {
    pos = sumVec(pos, [-1, 0]);
  }
  if (warehouse[pos[1]][pos[0]] === "[") {
    if (
      warehouse[pos[1] + dir[1]][pos[0]] === "#" ||
      warehouse[pos[1] + dir[1]][pos[0] + 1] === "#"
    ) {
      return false;
    }
    for (let i = -1; i <= 1; i++) {
      if (warehouse[pos[1] + dir[1]][pos[0] + i] === "[") {
        if (!moveBoxes([pos[0] + i, pos[1] + dir[1]], dir)) {
          return false;
        }
      }
    }
    warehouse[pos[1] + dir[1]][pos[0]] = "[";
    warehouse[pos[1] + dir[1]][pos[0] + 1] = "]";
    warehouse[pos[1]][pos[0]] = ".";
    warehouse[pos[1]][pos[0] + 1] = ".";
    return true;
  } else if (warehouse[pos[1]][pos[0]] === "]") console.log("ERROR");

  return false;
}

moves.forEach((move) => {
  const newPos = sumVec(robotsPos, moveMap[move]);
  if (warehouse[newPos[1]][newPos[0]] === ".") {
    robotsPos = newPos;
    return;
  } else if (warehouse[newPos[1]][newPos[0]] === "#") {
    return;
  }
  const warehouseCopy = structuredClone(warehouse);
  if (moveBoxes(newPos, moveMap[move])) {
    robotsPos = newPos;
    warehouse[robotsPos[1]][robotsPos[0]] = ".";
  } else {
    warehouse = warehouseCopy
  }
});

function drawMap() {
  warehouse.forEach((line, y) => {
    let tmp = "";

    line.forEach((c, x) => {
      if (y === robotsPos[1] && x === robotsPos[0]) {
        tmp = tmp + "@";
      } else tmp = tmp + c;
    });

    console.log(tmp);
  });
}

let result = 0;
warehouse.forEach((line, y) => {
  line.forEach((c, x) => c === "[" ? result += (y * 100) + x : null);
});

console.log(result);
