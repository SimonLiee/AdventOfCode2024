const text = await Deno.readTextFile("Input.txt");
const machines: { x: number; y: number }[][] = text.split("\n\n").map((i) => {
  const ret = [];
  const tmp = i.split("\n");
  ret.push({
    x: Number(tmp[0].slice(tmp[0].indexOf("X+") + 2, tmp[0].indexOf(","))),
    y: Number(tmp[0].slice(tmp[0].indexOf("Y+") + 2, tmp[0].length)),
  });
  ret.push({
    x: Number(tmp[1].slice(tmp[1].indexOf("X+") + 2, tmp[1].indexOf(","))),
    y: Number(tmp[1].slice(tmp[1].indexOf("Y+") + 2, tmp[1].length)),
  });
  ret.push({
    x: Number(tmp[2].slice(tmp[2].indexOf("X=") + 2, tmp[2].indexOf(","))),
    y: Number(tmp[2].slice(tmp[2].indexOf("Y=") + 2, tmp[2].length)),
  });
  return ret;
});

const lowestCosts: number[] = [];
machines.forEach((machine) => {
  let i = 0;
  const valid = [];
  while (machine[0].x * i < machine[2].x && machine[0].y * i < machine[2].y) {
    if (
      (machine[2].x - machine[0].x * i) % machine[1].x === 0 &&
      (machine[2].y - machine[0].y * i) % machine[1].y === 0
    ) {
      if (
        (machine[2].x - machine[0].x * i) / machine[1].x ===
          (machine[2].y - machine[0].y * i) / machine[1].y
      ) {
        valid.push(i * 3 + (machine[2].x - machine[0].x * i) / machine[1].x);
      }
    }
    i++;
  }
  console.log(valid)
  lowestCosts.push(Math.min(...valid));
});

const result = lowestCosts.reduce((acc, cost) => cost != Infinity ? acc + cost : acc, 0);
console.log(result);
