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

const antinodes = new Set();
Object.values(antennas).forEach((coordinates) => {
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const [y1, x1] = coordinates[i];
      const [y2, x2] = coordinates[j];
      const dy = y2 - y1;
      const dx = x2 - x1;

      const backY = y1 - dy;
      const backX = x1 - dx;
      if (backY >= 0 && backX >= 0 && backY < map.length && backX < map[0].length) {
        antinodes.add(`${backY},${backX}`);
      }

      const forwardY = y2 + dy;
      const forwardX = x2 + dx;
      if (forwardY < map.length && forwardX < map[0].length && forwardY >= 0 && forwardX >= 0) {
        antinodes.add(`${forwardY},${forwardX}`);
      }
    }
  }
});

console.log(antinodes.size);
