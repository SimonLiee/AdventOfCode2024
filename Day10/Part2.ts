const text = await Deno.readTextFile("Example.txt");
const map: number[][] = text.split("\n").map((elem) =>
  elem.split("").map((num) => Number(num))
);

function move(x: number, y: number, trailheads: string[]) {
  if (map[y][x] === 9) {
    trailheads.push([y, x].toString());
  }

  if (y - 1 >= 0 && map[y - 1][x] === map[y][x] + 1) {
    move(x, y - 1, trailheads);
  }
  if (y + 1 < map.length && map[y + 1][x] === map[y][x] + 1) {
    move(x, y + 1, trailheads);
  }
  if (x - 1 >= 0 && map[y][x - 1] === map[y][x] + 1) {
    move(x - 1, y, trailheads);
  }
  if (x + 1 < map[0].length && map[y][x + 1] === map[y][x] + 1) {
    move(x + 1, y, trailheads);
  }
}

let result = 0;
map.forEach((line, y) => {
  line.forEach((num, x) => {
    if (num === 0) {
      const trailheads: string[] = [];
      move(x, y, trailheads);
      result += trailheads.length;
    }
  });
});

console.log(result);
