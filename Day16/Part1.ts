const text = await Deno.readTextFile("Input.txt");
const maze: string[][] = text.split("\n").map((elem) => elem.split(""));

type vec2 = { x: number; y: number };

let start: vec2;
let end: vec2;
maze.forEach((line, y) => {
  const e = line.findIndex((char) => char === "E");
  const s = line.findIndex((char) => char === "S");
  if (e > 0) {
    end = { x: e, y: y };
  }
  if (s > 0) {
    start = { x: s, y: y };
  }
});

start = start!;
end = end!;

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
      if (maze[neighbor.y][neighbor.x] === "#") continue;

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

const path = a_star(start, end, man_dist);
let dir = vec2str({ x: 1, y: 0 });
const score = path?.reduce((acc, pos, i) => {
  if (i === 0) return 0;
  const newDir = vec2str(get_dir(str2vec(path[i - 1]), str2vec(pos)));
  let ret = acc + 1;
  if (newDir !== dir) {
    ret += 1000;
  }
  dir = newDir;
  return ret;
}, 0);

console.log(score);
