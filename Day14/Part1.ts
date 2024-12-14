const text = await Deno.readTextFile("Input.txt");
let robots: { x: number; y: number; vx: number; vy: number }[] = text
  .split("\n")
  .map((i) => {
    const ret = { x: 0, y: 0, vx: 0, vy: 0 };
    const tmp = i.split(" ");

    ret.x = Number(tmp[0].slice(tmp[0].indexOf("=") + 1, tmp[0].indexOf(",")));
    ret.y = Number(tmp[0].slice(tmp[0].indexOf(",") + 1));
    ret.vx = Number(tmp[1].slice(tmp[1].indexOf("=") + 1, tmp[1].indexOf(",")));
    ret.vy = Number(tmp[1].slice(tmp[1].indexOf(",") + 1));

    return ret;
  });

  // 101 103
const width = 101; //11;
const height = 103; //7;
for (let i = 0; i < 100; i++) {
  robots = robots.map(({ x, y, vx, vy }) => {
    return {
      x: x + vx < 0 ? width + (x + vx) : x + vx >= width ? x + vx - width: x + vx,
      y: y + vy < 0 ? height + (y + vy) : y + vy >= height ? y + vy - height: y + vy,
      vx: vx,
      vy: vy,
    };
  });
}

let topleft = 0;
let topright = 0;
let botleft = 0;
let botright = 0;
robots.forEach(({ x, y }) => {
  if (x < Math.floor(width / 2) && y < Math.floor(height / 2)) {
    topleft += 1;
  }
  if (x > Math.floor(width / 2) && y > Math.floor(height / 2)) {
    botright += 1;
  }
  if (x > Math.floor(width / 2) && y < Math.floor(height / 2)) {
    topright += 1;
  }
  if (x < Math.floor(width / 2) && y > Math.floor(height / 2)) {
    botleft += 1;
  }
});

for (let i = 0; i < height; i++) {
  let line = "";
  for (let j = 0; j < width; j++) {
    if(robots.find(({x, y})=>j === x && i === y)){
      line += "O";
    }
    else
    line += ".";
  }
  console.log(line)
}

let result = topleft * topright * botleft * botright;
// console.log(robots)
console.log(topleft ,
  topright,
  botleft ,
  botright);

console.log(result)