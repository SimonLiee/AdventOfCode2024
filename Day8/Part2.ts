const text = await Deno.readTextFile("Input.txt");
const map: string[][] = text.split("\n").map((line) => line.split(""));

const antennas: Record<string, [number, number][]> = {};

map.forEach((line, y) => {
  line.forEach((antenna, x) => {
    if (antenna !== ".") {
      if (!antennas[antenna]) {
        antennas[antenna] = [];
      }
      antennas[antenna].push([y, x]);
    }
  });
});

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function normalizeVector(vector: [number, number]): [number, number] {
  const [x, y] = vector;
  if (x === 0 && y === 0) {
    throw new Error("Cannot normalize a zero vector");
  }

  const divisor = gcd(Math.abs(x), Math.abs(y));
  return [x / divisor, y / divisor];
}

const antinodes = new Set();
Object.values(antennas).forEach((coordinates) => {
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const [y1, x1] = coordinates[i];
      const [y2, x2] = coordinates[j];

      const [dy, dx] = normalizeVector([y2 - y1, x2 - x1]);

      let backY = y1;
      let backX = x1;
      while (
        backY >= 0 && backX >= 0 &&
        backY < map.length && backX < map[0].length
      ) {
        antinodes.add(`${backY},${backX}`);
        backY -= dy;
        backX -= dx;
      }

      let forwardY = y1;
      let forwardX = x1;
      while (
        forwardY < map.length && forwardX < map[0].length &&
        forwardY >= 0 && forwardX >= 0
      ) {
        antinodes.add(`${forwardY},${forwardX}`);
        forwardY += dy;
        forwardX += dx;
      }
    }
  }
});

console.log(antinodes.size);
