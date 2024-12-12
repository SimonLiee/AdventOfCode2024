const text = await Deno.readTextFile("Input.txt");
const garden: string[][] = text.split("\n").map((elem) => elem.split(""));

let allVisited = new Set<string>();
function measure(label: string, x: number, y: number, visited: Set<string>) {
  let retPerimeter = 0;

  visited.add([x, y].toString());
  if (y + 1 < garden.length && garden[y + 1][x] === label) {
    if (!visited.has([x, y + 1].toString())) {
      retPerimeter += measure(label, x, y + 1, visited);
    }
  } else {
    retPerimeter += 1;
  }
  if (y - 1 >= 0 && garden[y - 1][x] === label) {
    if (!visited.has([x, y - 1].toString())) {
      retPerimeter += measure(label, x, y - 1, visited);
    }
  } else {
    retPerimeter += 1;
  }
  if (x + 1 < garden[y].length && garden[y][x + 1] === label) {
    if (!visited.has([x + 1, y].toString())) {
      retPerimeter += measure(label, x + 1, y, visited);
    }
  } else {
    retPerimeter += 1;
  }
  if (x - 1 >= 0 && garden[y][x - 1] === label) {
    if (!visited.has([x - 1, y].toString())) {
      retPerimeter += measure(label, x - 1, y, visited);
    }
  } else {
    retPerimeter += 1;
  }

  return retPerimeter;
}

let result = 0;
garden.forEach((line, y) => {
  line.forEach((label, x) => {
    if (label != "." && !allVisited.has([x, y].toString())) {
      const visited = new Set<string>();

      const perimeter = measure(label, x, y, visited);
      result += visited.size * perimeter;
      
      allVisited=allVisited.union(visited);
    }
  });
});

console.log(result);
