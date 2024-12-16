const text = await Deno.readTextFile("Example.txt");
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

function getValue(key: string, obj: Record<string, number>): number {
  return obj[key] !== undefined ? obj[key] : Infinity;
}

function a_star(
  start: vec2,
  end: vec2,
  h: (arg: vec2, arg1: vec2) => number
): vec2[][] {
  const openSet = new Set<string>([vec2str(start)]);
  const cameFrom: Record<string, string[]> = {}; // Store multiple parents

  const gScore: Record<string, number> = {};
  gScore[vec2str(start)] = 0;

  const fScore: Record<string, number> = {};
  fScore[vec2str(start)] = h(start, end);

  const allPaths: vec2[][] = []; // Store all shortest paths

  while (openSet.size > 0) {
    // Find node with the lowest fScore in the openSet
    const current = Array.from(openSet).reduce((lowest, pos) =>
      getValue(pos, fScore) < getValue(lowest, fScore) ? pos : lowest
    );

    openSet.delete(current);

    // If the end is reached, continue to gather paths
    if (current === vec2str(end)) {
      continue; // Keep searching for other potential paths
    }

    // Explore neighbors
    for (const neighbor of dirs.map((dir) => {
      return { x: str2vec(current).x + dir.x, y: str2vec(current).y + dir.y };
    })) {
      if (maze[neighbor.y][neighbor.x] === "#") continue; // Skip walls
      
      let last_dir = vec2str({ x: 1, y: 0 });
      if (cameFrom[current] !== undefined && cameFrom[current].length > 0) {
        // Use the first parent to determine direction
        const bestParent = cameFrom[current].sort(
          (a, b) => gScore[a] - gScore[b]
        )[0];
        last_dir = vec2str(
          get_dir(str2vec(bestParent), str2vec(current))
        );
      }

      const tentative_gScore = gScore[current] + 1;
        ((last_dir === vec2str(get_dir(str2vec(current), neighbor))) ? 1 : 1000);

      if(current === "13,2") console.log("current","13,2", tentative_gScore, current)
      // Update paths to neighbor
      if (
        tentative_gScore < getValue(vec2str(neighbor), gScore) ||
        tentative_gScore === getValue(vec2str(neighbor), gScore)
      ) {
        if(vec2str(neighbor) === "13,2") console.log("13,2", tentative_gScore, current)
        // If new gScore is strictly better, replace parents
        if (cameFrom[vec2str(neighbor)] === undefined) {
          cameFrom[vec2str(neighbor)] = [];
        }
        cameFrom[vec2str(neighbor)].push(current);

        gScore[vec2str(neighbor)] = tentative_gScore;
        fScore[vec2str(neighbor)] = tentative_gScore + h(neighbor, end);

        openSet.add(vec2str(neighbor));
      }
    }
  }

  console.log(cameFrom)
  return []//reconstruct_all_paths(cameFrom, vec2str(end));
}

// Helper to reconstruct all paths from cameFrom
function reconstruct_all_paths(
  cameFrom: Record<string, string[]>,
  current: string
): vec2[][] {
  const paths: vec2[][] = [];

  function backtrack(node: string, path: vec2[]) {
    path.push(str2vec(node));
    if (!cameFrom[node] || cameFrom[node].length === 0) {
      // Add the complete path when reaching the start
      paths.push([...path].reverse());
      return;
    }
    for (const parent of cameFrom[node]) {
      backtrack(parent, path);
    }
    path.pop(); // Backtrack
  }

  backtrack(current, []);
  return paths;
}


function scorePath(path: vec2[]): number {
  let dir = vec2str({ x: 1, y: 0 });

  return path.reduce((acc, pos, i) => {
    if (i === 0) return 0;
    const newDir = vec2str(get_dir(path[i - 1], pos));
    let ret = acc + 1;
    if (newDir !== dir) {
      ret += 1000;
    }
    dir = newDir;
    return ret;
  }, 0);
}

const paths = a_star(start, end, man_dist);
let dir = vec2str({ x: 1, y: 0 });
const score = paths.reduce((acc, path) => {
  console.log("here",scorePath(path))
  return acc + scorePath(path)
}, 0);

console.log(paths[0])
console.log(score);
