const text = await Deno.readTextFile("Input.txt");
const splitText: string[] = text
  .split("\n\n");

const warehouse = splitText[0].split("\n").map((elem) => elem.split(""));
const moves = splitText[1].split("").filter((elem) => elem !== "\n");

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

moves.forEach((move) => {
  const newPos = sumVec(robotsPos, moveMap[move]);
  if (warehouse[newPos[1]][newPos[0]] === ".") {
    robotsPos = newPos;
    return;
  } else if (warehouse[newPos[1]][newPos[0]] === "#") {
    return;
  }

  let tmpPos = sumVec(newPos, moveMap[move]);
  while (warehouse[tmpPos[1]][tmpPos[0]] === "O") {
    tmpPos = sumVec(tmpPos, moveMap[move]);
  }
  if (warehouse[tmpPos[1]][tmpPos[0]] === ".") {
    while (!compVec(tmpPos, newPos)) {
      warehouse[tmpPos[1]][tmpPos[0]] = "O";
      tmpPos = sumVec(tmpPos, flipVec(moveMap[move]));
    }
    warehouse[newPos[1]][newPos[0]] = ".";
    robotsPos = newPos;
  }
});

function drawMap() {
  warehouse.forEach((line) => {
    let tmp = "";

    line.forEach((c) => tmp = tmp + c);

    console.log(tmp);
  });
}

let result = 0;
warehouse.forEach((line, y) => {
  line.forEach((c, x) => c === "O" ? result += (y * 100) + x : null);
});

console.log(result);
