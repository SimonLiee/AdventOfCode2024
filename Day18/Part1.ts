const text = await Deno.readTextFile("Input.txt");
const bytes: number[][] = text.split("\n").map((elem) =>
  elem.split(",").map(Number)
);

type vec2 = { x: number; y: number };

const dirs = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
];

function man_dist(start: vec2, end: vec2) {
  return start.x - end.x + start.y - end.y;
}

function get_dir(start: vec2, end: vec2) {
  return { x: end.x - start.x * 1, y: end.y - start.y * 1 };
}

function str2vec(str: string) {
  const splt = str.split(",");
  return { x: Number(splt[0]), y: Number(splt[1]) };
}

function vec2str(vec: vec2) {
  return `${vec.x},${vec.y}`;
}

function reconstruct_path(cameFrom: Record<string, string>, current: string) {
  const total_path = [current];
  while (cameFrom[current] !== undefined) {
    current = cameFrom[current];
    total_path.unshift(current);
  }
  return total_path;
}

function getValue(key: string, obj: Record<string, number>): number {
  return obj[key] !== undefined ? obj[key] : Infinity;
}

function a_star(start: vec2, end: vec2, h: (arg: vec2, arg1: vec2) => number) {
  const openSet = new Set<string>([vec2str(start)]);
  const cameFrom: Record<string, string> = {};

  const gScore: Record<string, number> = {};
  gScore[vec2str(start)] = 0;

  const fScore: Record<string, number> = {};
  fScore[vec2str(start)] = h(start, end);

  while (openSet.size > 0) {
    const current = openSet.values().reduce(
      (lowest, pos) =>
        getValue(pos, fScore) < getValue(lowest, fScore) ? pos : lowest,
      openSet.values().toArray()[0],
    );

    if (current === vec2str(end)) {
      return reconstruct_path(cameFrom, current);
    }

    openSet.delete(current);

    for (
      const neighbor of dirs.map((dir) => {
        return { x: str2vec(current).x + dir.x, y: str2vec(current).y + dir.y };
      })
    ) {
      if (neighbor.y >= map.length || neighbor.y < 0) continue;
      if (neighbor.x >= map[neighbor.y].length || neighbor.x < 0) continue;
      if (map[neighbor.y][neighbor.x] === "#") continue;

      let last_dir = vec2str({ x: 1, y: 0 });
      if (cameFrom[current] !== undefined) {
        last_dir = vec2str(
          get_dir(str2vec(cameFrom[current]), str2vec(current)),
        );
      }
      const tentative_gScore = gScore[current] +
        ((last_dir === vec2str(get_dir(str2vec(current), neighbor)))
          ? 1
          : 1000);

      if (tentative_gScore < (getValue(vec2str(neighbor), gScore))) {
        cameFrom[vec2str(neighbor)] = current;
        gScore[vec2str(neighbor)] = tentative_gScore;
        fScore[vec2str(neighbor)] = tentative_gScore + h(neighbor, end);
        openSet.add(vec2str(neighbor));
      }
    }
  }
}

const map: string[][] = [];
for (let i = 0; i < 71; i++) {
  const line = [];
  for (let j = 0; j < 71; j++) {
    line.push(".");
  }
  map.push(line);
}

bytes.slice(0, 1024).forEach((byte) => map[byte[0]][byte[1]] = "#");
console.log(map);


const path = a_star({ x: 0, y: 0 }, { x: 70, y: 70 }, man_dist);
const score = path!.length - 1;

function drawMap() {
  map.forEach((line, y) => {
    let tmp = "";

    line.forEach((c, x) => path!.findIndex((p)=>str2vec(p).x === x && str2vec(p).y === y) > -1 ? tmp = tmp + "O":tmp = tmp + c);

    console.log(tmp);
  });
}

// drawMap()
console.log(score);
