const text = await Deno.readTextFile("Input.txt");
const garden: string[][] = text.split("\n").map((line) => line.split(""));

const allVisited = new Set<string>();

function measure(
  label: string,
  x: number,
  y: number,
  visited: Set<string>,
): [string, number, number][] {
  let retPerimeter: [string, number, number][] = [];
  visited.add(`${x},${y}`);

  const directions: [number, number, string][] = [
    [0, 1, "^"],
    [0, -1, "v"],
    [1, 0, ">"],
    [-1, 0, "<"],
  ];

  for (const [dx, dy, symbol] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (
      ny >= 0 && ny < garden.length && nx >= 0 && nx < garden[ny].length &&
      garden[ny][nx] === label
    ) {
      if (!visited.has(`${nx},${ny}`)) {
        retPerimeter = [...retPerimeter, ...measure(label, nx, ny, visited)];
      }
    } else {
      retPerimeter.push([symbol, x * 2 + dx, y * 2 + dy]);
    }
  }

  return retPerimeter;
}

function calcSides(perimeter: [string, number, number][]): number {
  let total = 0;

  perimeter.sort((a, b) => (a[1] !== b[1] ? a[1] - b[1] : a[2] - b[2]));

  while (perimeter.length > 0) {
    total += 1;
    const side = perimeter[0];
    const adjacentIndices: number[] = [0];

    let i = 1;

    while (true) {
      const findUp: [string, number, number] =
        side[0] === ">" || side[0] === "<"
          ? [side[0], side[1], side[2] + i * 2]
          : [side[0], side[1] + i * 2, side[2]];

      const foundIndex = perimeter.findIndex((elem) =>
        elem.toString() === findUp.toString()
      );
      
      if (foundIndex < 0) break;

      if (foundIndex !== -1) {
        adjacentIndices.push(foundIndex);
      }

      i++;
    }

    adjacentIndices
      .sort((a, b) => b - a) // Sort descending to safely splice
      .forEach((index) => perimeter.splice(index, 1));
  }

  return total;
}

function drawPerimeter(perimeter: [string, number, number][]): void {
  for (let y = -1; y < garden.length * 2; y++) {
    let line = "";
    for (let x = -1; x < garden[0].length * 2; x++) {
      const index = perimeter.findIndex((elem) =>
        elem[1] === x && elem[2] === y
      );
      line += index >= 0 ? perimeter[index][0] : "*";
    }
    console.log(line);
  }
  console.log();
}

let result = 0;

garden.forEach((line, y) => {
  line.forEach((label, x) => {
    if (label !== "." && !allVisited.has(`${x},${y}`)) {
      const visited = new Set<string>();
      const perimeter = measure(label, x, y, visited);

      // drawPerimeter(perimeter);

      const price = calcSides(perimeter);
      result += visited.size * price;

      visited.forEach((cell) => allVisited.add(cell));
    }
  });
});

console.log(result);
